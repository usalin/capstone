import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.interface';
import { CartItem } from '../models/product.interface';

export const LOCAL_STORAGE_CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart!: Cart;
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor(private http: HttpClient) { }

  initialiseCartLocalStorage() {
    const cart: Cart = this.getCart();
  }

  emptyCart() {
    const emptyCart = { items: [] };
    return this.http.post('http://localhost:3000/cart', emptyCart).subscribe(console.log)
  }

  getCart(): Cart {
   this.http.get<Cart>('http://localhost:3000/cart').subscribe(data => this.cart = data);
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
    return this.http.post('http://localhost:3000/cart', cart).subscribe(console.log)
  }

  deleteCartItem(id: number) {
    const cart = this.getCart();
    const updatedCart = cart.items.filter((item) => item.id !== id);
    cart.items = updatedCart;
  }

  calculateCartTotal() {
    const cart = this.getCart();
    let total = 0;
    cart.items?.forEach(cartItem => {
      total += (cartItem.price * cartItem.quantity)
    });
    return total;
  }
}




