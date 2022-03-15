import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketClass, BasketCostDivision } from '../models/basket.interface';
import { BasketItem, Product } from '../models/product.interface';
import * as uuid from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basket$ = this.basketSource.asObservable();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private basketTotalSource = new BehaviorSubject<BasketCostDivision | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
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

  getBasket() {
    return this.http.get<Basket>(this.baseUrl + '/carts?id=17')
      .pipe(
        map((basket: Basket) => {
          this.basketSource.next(basket);
        })
      );
  }

  setBasket() {
    const passedBasket: Basket = { items: [ 
      {
      quantity: 3, 
      productId: 2,
      shortDescription: "description 2 modified",
      productName: "product two",
      smallImageUrl: "https://via.placeholder.com/150",
      price: 19.99,
      largerImageUrl: "https://via.placeholder.com/300",
      longDescription: "longer description 2",
      category: "speakers"
      }
    ]}
    return this.http.put<Basket>(this.baseUrl + '/carts/2d7ea2a6-fa1d-4a5f-acd1-220098504434', passedBasket, {headers: this.headers }).subscribe((response: Basket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }


  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd: BasketItem = {...item, quantity};
    const cartId = uuid.v4();
    const initialState: Basket = {    
      id: cartId,
      items: [],
      shippingPrice: 0
    };

    let basket = this.getCurrentBasketValue() || initialState;
    
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    // this.setBasket(basket);
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
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

  
  private createBasket(): Basket {
    const basket = new BasketClass();


    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const subtotal = basket != null ? basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0) : 0;
    if (subtotal !== 0) {
     this.shipping = subtotal* 0.1;
     this.vat = subtotal * this.vatPercent;
    }
   
    this.basketTotalSource. next({subtotal, shipping: this.shipping, vat: this.vat});
  }

  

  incrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket != null) {
      const foundItemIndex = basket.items.findIndex(x => x.productId === item.productId);
      //need to debug this.
      basket.items[foundItemIndex].quantity++;
      // this.setBasket(basket);
    }
  }


  decrementItemQuantity(item: BasketItem) {
    // need to make this one work
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket?.items.findIndex(x => x.productId === item.productId);
    // if (foundItemIndex != -1) {
      
    // }
    // if (basket.items[foundItemIndex].quantity > 1) {
    //   basket.items[foundItemIndex].quantity--;
    //   this.setBasket(basket);
    // } else {
    //   this.removeItemFromBasket(item);
    // }
  }


  removeItemFromBasket(item: BasketItem) {
    // need to refactor this.
    // const basket = this.getCurrentBasketValue();
    // if (basket.items.some(x => x.productId === item.productId)) {
    //   basket.items = basket.items.filter(i => i.id !== item.id);
    //   if (basket.items.length > 0) {
    //     this.setBasket(basket);
    //   } else {
    //     this.deleteBasket(basket);
    //   }
    // }
  }


  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    // this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }


  // deleteBasket(basket: IBasket) {  
    // to persist
  //   return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
  //     this.basketSource.next(null);
  //     this.basketTotalSource.next(null);
  //     localStorage.removeItem('basket_id');
  //   }, error => {
  //     console.log(error);
  //   });
  // }




  // / Update
  // update(id: any, data: any): Observable<any> {
  //   let API_URL = `${this.secondUrl}/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers }).pipe(
  //     catchError(this.handleError)
  //   )
  // }

}
