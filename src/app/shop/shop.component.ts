import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Product } from '../models/product.interface';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent {

  products$!: Observable<Product[]>;
  userPreference: 'card' | 'table' = 'table';

  constructor(private productService: ProductService) { }

  ngOnInit() {
      this.products$ = this.productService.getAllProducts();

    localStorage.getItem('prefersCard') === 'true' ? this.userPreference ='card' : this.userPreference = 'table';
  }
}
