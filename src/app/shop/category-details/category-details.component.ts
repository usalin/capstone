import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent implements OnInit {

  products$!: Observable<Product[]>;
  categoryName!: string;

  constructor(private route: ActivatedRoute,private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.getCategoryItems();
    });
  }

  getCategoryItems() {
    this.products$ = this.productService.getProductsByCategory(this.categoryName);  
  }
}
