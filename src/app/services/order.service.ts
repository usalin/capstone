import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Order, OrderInformation } from '../models/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private cartService: CartService) { /* Ø */ }

  createOrder(orderInformation: OrderInformation) {
    const ordersUrl = `http://localhost:3000/orders`;

    const cart = this.cartService.getCartValue();
    const order = { orderInfo: orderInformation, cart };

    return this.http.post<Order>(ordersUrl, order).pipe(
      map((data: Order) => {
        if (data) {
          localStorage.removeItem('cartId');
          return true;
         }
        else return new Error('Could not create an order ');
      })
    );
  }

  /**
   * REMOVE IF FUNCTIONALITY IS NOT EXTENDED
   * @returns Order[]
   */

  getAllOrders() {
    const API_URL = `http://localhost:3000/orders`;
    return this.http.get<Order[]>(API_URL).subscribe();
  }
}
