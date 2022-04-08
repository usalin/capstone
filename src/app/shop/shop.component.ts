import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product.interface';
import { ProductService } from './services/product.service';

type userPreference = 'card' | 'table';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent {

  products$!: Observable<Product[]>;
  userPreference: 'card' | 'table' = 'table';

  constructor(private productService: ProductService) { /* ∅ */ }

  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
    localStorage.getItem('prefersCard') === 'true' ? this.userPreference ='card' : this.userPreference = 'table';
  }

  toggleChange(userInput: userPreference) {
    
    if (userInput === 'card') this.userPreference = 'card';
    else if (userInput === 'table') this.userPreference = 'table';
    const localStorageValue = this.userPreference == 'card' ? 'true' : 'false';

    localStorage.setItem('prefersCard', localStorageValue);
  }
}
