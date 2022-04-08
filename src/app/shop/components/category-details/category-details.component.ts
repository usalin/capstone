import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

type userPreference = 'card' | 'table';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent implements OnInit {

  products$!: Observable<Product[]>;
  categoryName!: string;
  userPreference: 'card' | 'table' = 'table';


  constructor(private route: ActivatedRoute,private productService: ProductService) { /* ∅ */ }

  ngOnInit(): void {
    localStorage.getItem('prefersCard') === 'true' ? this.userPreference ='card' : this.userPreference = 'table';
    this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.getCategoryItems();
    });
  }

  getCategoryItems() {
    this.products$ = this.productService.getProductsByCategory(this.categoryName);  
  }

  toggleChange(userInput: userPreference) {
    if (userInput === 'card') this.userPreference = 'card';
    else if (userInput === 'table') this.userPreference = 'table';
    const localStorageValue = this.userPreference == 'card' ? 'true' : 'false';

    localStorage.setItem('prefersCard', localStorageValue);
  }
}
