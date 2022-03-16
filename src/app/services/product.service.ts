import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem, Product } from '../models/product.interface';
import * as uuid from 'uuid';
import { Cart, CartClass, CartCostDivision } from '../models/cart.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  private cartSource = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSource.asObservable();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private cartTotalSource = new BehaviorSubject<CartCostDivision | null>(null);
  cartTotal$ = this.cartTotalSource.asObservable();
  shipping = 0;
  vatPercent = 18;
  vat = 0;


  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getProductsByCategory() {
    return this.http.get(`${this.baseUrl}/products?category=category-1`);
  }

  searchProduct(searchWord: string) {
    return this.http.get(`${this.baseUrl}/products?productName_like=${searchWord}`);
  }

  getCart(id: string) {
    return this.http.get<Cart>(this.baseUrl + `/carts?id=${id}`)
      .pipe(
        map((cart: Cart) => {
          this.cartSource.next(cart);
        })
      );
  }

  setcart(cart: Cart) {
    // const passedcart: cart = { items: [ 
    //   {
    //   quantity: 3, 
    //   productId: 2,
    //   shortDescription: "description 2 modified",
    //   productName: "product two",
    //   smallImageUrl: "https://via.placeholder.com/150",
    //   price: 19.99,
    //   largerImageUrl: "https://via.placeholder.com/300",
    //   longDescription: "longer description 2",
    //   category: "speakers"
    //   }
    // ]}

        this.cartSource.next(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.calculateTotals();
  }

  getCurrentcartValue() {
    return this.cartSource.value;
  }


  addItemTocart(item: Product, quantity = 1) {
    const itemToAdd: CartItem = {...item, quantity};

    let cart = this.getCurrentcartValue();
    if (!cart?.id) {
      cart = this.createCart();
    }
      cart.items = this.addOrUpdateItem(cart.items, itemToAdd, quantity);
      this.setcart(cart);
  }

  private addOrUpdateItem(items: CartItem[], itemToAdd: CartItem, quantity: number): CartItem[] {

    const index = items.findIndex(i => i.productId === itemToAdd.productId);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } 
    else {
      items[index].quantity += quantity;
    }
    return items;
  }

  
  private createCart() {
    const cart = new CartClass();
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }

  createDBCart(cart: Cart) {
    return this.http.post<Cart>(`${this.baseUrl}/carts`, cart, {headers: this.headers }).subscribe((response: Cart) => {
      this.cartSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }


  private calculateTotals() {
    const cart = this.getCurrentcartValue();
    const subtotal = cart != null ? cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0) : 0;
    if (subtotal !== 0) {
     this.shipping = subtotal* 0.1;
     this.vat = subtotal * this.vatPercent;
    }
   
    this.cartTotalSource. next({subtotal, shipping: this.shipping, vat: this.vat});
  }

  

  incrementItemQuantity(item: CartItem) {
    const cart = this.getCurrentcartValue();
    if (cart != null) {
      const foundItemIndex = cart.items.findIndex(x => x.productId === item.productId);
      cart.items[foundItemIndex].quantity++;
      this.setcart(cart);
    }
  }


  decrementItemQuantity(item: CartItem) {
  //  let cart = this.getCurrentcartValue();
  //  if (cart === null) cart = this.createCart();
  //   const foundItemIndex = cart.items.findIndex(x => x.productId === item.productId);
  //   if (foundItemIndex !== -1) {
  //     if (cart?.items[foundItemIndex].quantity > 1) {
  //       cart.items[foundItemIndex].quantity--;
  //       this.setcart(cart);
  //     } else {
  //       this.removeItemFromcart(item);
  //     }
  //   }
  }


  removeItemFromcart(item: CartItem) {
    const cart = this.getCurrentcartValue();
    if (cart?.items.some(x => x.productId === item.productId)) {
      cart.items = cart.items.filter(i => i.productId !== item.productId);
      if (cart.items.length > 0) {
        this.setcart(cart);
      } else {
        this.deletecart(cart);
      }
    }
  }


  emptyLocalcart(id: string) {
    this.cartSource.next(null);
    this.cartTotalSource.next(null);
    localStorage.removeItem('cartId');
  }


  deletecart(cart: Cart) {  
    return this.http.delete(this.baseUrl + 'cart?id=' + cart.id).subscribe(() => {
      this.cartSource.next(null);
      this.cartTotalSource.next(null);
      localStorage.removeItem('cartId');
    }, error => {
      console.log(error);
    });
  }




  // / Update
  // update(id: any, data: any): Observable<any> {
  //   let API_URL = `${this.secondUrl}/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers }).pipe(
  //     catchError(this.handleError)
  //   )
  // }

}
