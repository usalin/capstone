import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shop/models/product.interface';
import { ProductService } from 'src/app/shop/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  products$: Observable<Product[]> = this.productService.getAllProducts();


  constructor(private productService: ProductService) { /* ∅ */ }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(console.log);
  }
}
