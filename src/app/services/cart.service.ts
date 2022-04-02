import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from '../models/cart.interface';
import { CartItem } from '../models/product.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const LOCAL_STORAGE_CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl = `${environment.baseUrl}/cart`;
  private cartSource = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSource.asObservable();
  private currentTotalSource = new BehaviorSubject<number>(0);
  currentTotal$ = this.currentTotalSource.asObservable();

  constructor(private http: HttpClient) { /* Ø */ }

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
        const total = this.calculateCartTotal();
        this.currentTotalSource.next(total);
      }
      ));
  }

  getCartValue() {
    return this.cartSource.value;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean) {
    cartItem.productId = cartItem.id;
    const { id, ...idLessCartItem } = cartItem;;

    const cart = this.getCartValue();
    if (cart != null) {
      const cartItemExists = cart.items.find((item) => item.productId === idLessCartItem.productId);
      if (cartItemExists) {
        cart.items.map((item) => {
          if (item.productId === idLessCartItem.productId) {
            if (updateCartItem) { item.quantity = idLessCartItem.quantity; }
            else { item.quantity = item.quantity + idLessCartItem.quantity; }
            return item;
          };
          return item;
        });
      }
      else {
        cart.items.push(idLessCartItem);
      }
      
      return cart;
    }
    return;
  }

  updateCart(cart: Cart): Observable<Cart> {
    const cartTotal = this.calculateCartTotal();

    return this.http.put<Cart>(`${this.cartUrl}/${cart.id}`, cart).pipe(
      tap((data: Cart) => {
        this.cartSource.next(data);
        const cartTotal = this.calculateCartTotal();
        this.currentTotalSource.next(cartTotal);
      })
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
    return 0;
  }
}




