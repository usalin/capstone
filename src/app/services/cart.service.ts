import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.interface';
import { CartItem } from '../models/product.interface';

export const LOCAL_STORAGE_CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initialiseCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const intialCart = {
        items: []
      };
      //this will not be refactored
      const intialCartJson = JSON.stringify(intialCart);
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, intialCartJson);
    }
  }

  emptyCart() {
    const intialCart = {
      items: []
    };

    //pass to refactor
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }

  getCart(): Cart {
    const cartJsonString: string = localStorage.getItem(LOCAL_STORAGE_CART_KEY)!;
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
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

    //pass cart to refactor
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, cartJson);
    this.cart$.next(cart);

    return cart;
  }

  deleteCartItem(id: number) {
    const cart = this.getCart();
    const updatedCart = cart.items.filter((item) => item.id !== id);

    cart.items = updatedCart;

    //pass cart to refactor

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, cartJsonString);
    this.cart$.next(cart);
  }

  calculateCartTotal() {
    const cart = this.getCart();

    let total = 0;
    cart.items.forEach(cartItem => {
      total += (cartItem.price * cartItem.quantity)
    });

    return total;
  }
}




