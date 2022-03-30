import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order, OrderInformation } from '../models/order.interface';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private cartService: CartService) { }

  createOrder(orderInformation: OrderInformation) {
    const API_URL = `http://localhost:3000/orders`;

    const orderItems = this.cartService.cart;
    const order = { orderInfo: orderInformation, cart:  orderItems };

    return this.http.post<Order>(API_URL, order).pipe(
      map((data: Order) => {
        if (data) return true;
        else return new Error('Could not create an order ');
      })
    );
  }

  getAllOrders() {
    const API_URL = `http://localhost:3000/orders`;
    return this.http.get<Order[]>(API_URL).subscribe();

  }
}
