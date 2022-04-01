import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Cart } from '../models/cart.interface';
import { CartItem } from '../models/product.interface';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';

export const LOCAL_STORAGE_CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl = `${environment.baseUrl}/cart`;

  //REFACTOR THIS CART VARIABLE AND DEPENDENCIES
  cart!: Cart;
  private cartSource = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSource.asObservable();
  private currentTotalSource = new Subject<number>();
  currentTotal$ = this.currentTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  emptyCart() {
    const cart = this.getCartValue();
    if (cart) {
      cart.items = [];
      return this.http.put<Cart>(`${this.cartUrl}/${this.cartId}`, cart).pipe(
        tap((data: Cart) => {
          this.cartSource.next(data);
        }));
    }
    return 0;
  }

  get cartId() {
    return localStorage.getItem('cartId');
  }

  getCart(cartId?: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.cartUrl}/${cartId}`).pipe(
      tap((data: Cart) => {
        this.cartSource.next(data);
        this.calculateCartTotal();
      }
      ));
  }

  getCartValue() {
    return this.cartSource.value;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Observable<Cart> {
    cartItem.productId = cartItem.id;
    cartItem.id = uuid();

    const cart = this.cart;
    const cartItemExists = cart.items.find((item) => item.productId === cartItem.productId);
    if (cartItemExists) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
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
    return this.updateCart(cart);
  }

  updateCart(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.cartUrl}/${this.cart.id}`, cart).pipe(
      tap((data: Cart) => this.cartSource.next(data))
    );
  }

  createNewCart(): Observable<Cart> {
    return this.http.post<Cart>(`${this.cartUrl}`, {}).pipe(
      tap((data: Cart) => {
        this.cartSource.next(data);
        localStorage.setItem('cartId', data.id);
      })
    )
  }

  calculateCartTotal() {
    if (this.getCartValue() !== null) {
      const cart = this.getCartValue();
      let total = 0;
      cart?.items?.forEach(cartItem => {
        total += (cartItem.price * cartItem.quantity)
      });
      this.currentTotalSource.next(total);
      return total;
    }
    this.currentTotalSource.next(0);
    return;
  }
}




