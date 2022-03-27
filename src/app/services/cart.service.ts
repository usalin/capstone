import { HttpClient } from '@angular/common/http';
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

  private cartSource = new Subject<Cart>();
  cart$ = this.cartSource.asObservable();
  private currentTotalSource = new Subject<number>();
  currentTotal$ = this.currentTotalSource.asObservable();


  constructor(private http: HttpClient) { }

  initialiseCartLocalStorage() {
    const cart: Cart = this.getCart();
  }

  emptyCart() {
    const cart = this.getCart();
    cart.items = [];
    return this.http.post<Cart>('http://localhost:3000/cart', cart).subscribe(data => {
      this.cart = data;
      this.cartSource.next(data);
    })
  }

  getCart(): Cart {
   this.http.get<Cart>('http://localhost:3000/cart').subscribe(data => {
   this.cart = data;
   this.cartSource.next(data);
   this.calculateCartTotal();
  });
   return this.cart;
  }


  setCartItem(cartItem: CartItem, updateCartItem?: boolean) {
    const cart = this.getCart();
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
    return this.http.post<Cart>('http://localhost:3000/cart', cart).subscribe(data => {
      this.cart = data;
      this.cartSource.next(data);
    })
  }

  deleteCartItem(id: number) {
    const cart = this.getCart();
    const updatedCart = cart.items.filter((item) => item.id !== id);
    cart.items = updatedCart;
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




