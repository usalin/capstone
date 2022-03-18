import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent {
  
  products$: Observable<Product[]> = this.productService.getAllProducts();
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

}
