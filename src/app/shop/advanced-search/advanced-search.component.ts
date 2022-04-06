import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, startWith, map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html'
})
export class AdvancedSearchComponent implements OnInit {

  products$!: Observable<Product[]>;

  category = new FormControl();
  rating = new FormControl();
  maxPrice = new FormControl();  
  minPrice = new FormControl();  

  categoryList: string[] = ['headphones', 'speakers', 'earphones', 'casa'];
  ratingList: string [] = ['3', '4', '5'];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = combineLatest([
      this.productService.getAllProducts(),
      this.category.valueChanges.pipe(startWith('All')),
      this.minPrice.valueChanges.pipe(startWith('0')),
      this.maxPrice.valueChanges.pipe(startWith('9999999')),
      this.rating.valueChanges.pipe(startWith('3'))
    ]).pipe(
      map(([products, category, minPrice, maxPrice, rating]) => {
        //STEP I - Filter by category
        const result = category === 'All' ? products : products.filter(p => p.category === category);
        //STEP II - Filter by min - max Price
        const secondResult = result.filter(p => (p.price < maxPrice && p.price > minPrice));
        //STEP III - Filter by Minimum Rating
        const thirdResult = secondResult.filter(p => p.rating >= rating)

        // FAP -> Refactor to limit this to an Enum
        return thirdResult;
      }));
  }
}
