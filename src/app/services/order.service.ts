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

  ordersUrl = `${environment.baseUrl}/orders`;

  constructor(private http: HttpClient, private cartService: CartService) { /* Ø */ }

  createOrder(orderInformation: OrderInformation) {

    const cart = this.cartService.getCartValue();
    const order = { orderInfo: orderInformation, cart };

    return this.http.post<Order>(this.ordersUrl, order).pipe(
      map((data: Order) => {
        if (data) {
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
    return this.http.get<Order[]>(this.ordersUrl).subscribe();
  }
}
