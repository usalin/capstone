import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart } from '../models/cart.interface';
import { CartItem } from '../models/product.interface';

export const LOCAL_STORAGE_CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart!: Cart;

  private cartId = new Subject<string>();
  cartId$ = this.cartId.asObservable();
  private cartSource = new Subject<Cart>();
  cart$ = this.cartSource.asObservable();
  private currentTotalSource = new Subject<number>();
  currentTotal$ = this.currentTotalSource.asObservable();


  constructor(private http: HttpClient) { }

  initialiseCart() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) this.getCart(cartId)
    else this.createNewCart();
  }

  emptyCart() {
    const cart = this.cart;
    cart.items = [];
    return this.http.put<Cart>(`http://localhost:3000/cart/${this.cart.id}`, cart).subscribe(data => {
      this.cart = data;
      this.cartSource.next(data);
    })
  }

  getCart(cartId?: string) {

      this.http.get<Cart>(`http://localhost:3000/cart/${cartId}`).subscribe(data => {
        this.cart = data;
        this.cartSource.next(data);
        this.calculateCartTotal();
        return this.cart;
       });
  }


  setCartItem(cartItem: CartItem, updateCartItem?: boolean) {
    const cart = this.cart
    const cartItemExist = cart.items.find((item) => item.id === cartItem.id);
    if (cartItemExist) {
      cart.items.map((item) => {
        if (item.id === cartItem.id) {
          if (updateCartItem) { item.quantity = cartItem.quantity; }
          else { item.quantity = item.quantity + cartItem.quantity; }
          return item;
        };
        return item;
      });
    }
    else {
      cart.items.push(cartItem);
    }
    // return this.http.put<Cart>('http://localhost:3000/cart/4102d1a0-2af5-4a78-9569-d0ea036e23d8', cart).subscribe(data => {
    return this.http.put<Cart>(`http://localhost:3000/cart/${this.cart.id}`, cart).subscribe(data => {
      this.cart = data;
      console.log(data)
      this.cartSource.next(data);
    })
  }


  createNewCart() {
    return this.http.post<Cart>('http://localhost:3000/cart/', {}).subscribe((data => {
      console.log(data);
      this.cart = data;
      this.cartSource.next(data);
      this.cartId.next(data.id);
      localStorage.setItem('cartId', data.id);
      return this.cart;
    }))
  }

  calculateCartTotal() {
    const cart = this.cart;
    let total = 0;
    cart.items?.forEach(cartItem => {
      total += (cartItem.price * cartItem.quantity)
    });
    this.currentTotalSource.next(total);
    return total;
  }
}




