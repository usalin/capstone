import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, startWith, map, Observable, delay } from 'rxjs';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

type userPreference = 'card' | 'table';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html'
})
export class AdvancedSearchComponent implements OnInit {

  products$!: Observable<Product[]>;
  userPreference: 'card' | 'table' = 'table';

  /**
   * LIST OF FORM CONTROLS CREATED TO FILTER
   */
  searchBy = new FormControl();
  category = new FormControl();
  rating = new FormControl();
  maxPrice = new FormControl();  
  minPrice = new FormControl();  
  /**
   * 
   */
  categoryList: string[] = ['headphones', 'speakers', 'earphones', 'all'];
  ratingList: string [] = ['3', '4', '5'];

  constructor(private productService: ProductService) { /* ∅ */ }

  ngOnInit() {
    localStorage.getItem('prefersCard') === 'true' ? this.userPreference ='card' : this.userPreference = 'table';

    this.products$ = combineLatest([
      this.productService.getAllProducts(),
      this.searchBy.valueChanges.pipe(startWith('')),
      this.category.valueChanges.pipe(startWith('all')),
      this.minPrice.valueChanges.pipe(startWith('0')),
      this.maxPrice.valueChanges.pipe(startWith('9999999')),
      this.rating.valueChanges.pipe(startWith('3'))
    ]).pipe(
      delay(1000),
      map(([products, searchBy, category, minPrice, maxPrice, rating]) => {
        // STEP I - Filtering by category
        const categorySpecificResult = category === 'all' ? products : products.filter(p => p.category === category);
        // STEP II - Filtering by price then rating
        const finalResult = categorySpecificResult
                           .filter(p => p.productName.toLowerCase().includes(searchBy.toLowerCase()))
                           .filter(p => (p.price < maxPrice && p.price > minPrice))
                           .filter(p => p.rating >= rating);                         
        return finalResult;
      }));
  }

  toggleChange(userInput: userPreference) {
    
    if (userInput === 'card') this.userPreference = 'card';
    else if (userInput === 'table') this.userPreference = 'table';
    const localStorageValue = this.userPreference == 'card' ? 'true' : 'false';

    localStorage.setItem('prefersCard', localStorageValue);
  }

}
