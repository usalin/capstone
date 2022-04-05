import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent {

  products$: Observable<Product[]> = this.productService.getAllProducts();
  userPreference: 'card' | 'table' = 'table';
  
  constructor(private productService: ProductService, private orderService: OrderService) { }

  ngOnInit() {
    localStorage.getItem('prefersCard') === 'true' ? this.userPreference ='card' : this.userPreference = 'table';
  }
}
