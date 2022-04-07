import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html'
})
export class ProductSearchComponent implements OnInit {
  
  products$!: Observable<Product[]>;
  searchWord!: string;

  constructor(private route: ActivatedRoute,private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.
    pipe(
      delay(1000)
    ).
    subscribe(params => {
      this.searchWord = params['search'];
      this.getProductsBySearchWord();
    });
  }

  getProductsBySearchWord() {
    this.products$ = this.productService.getProductBySearch(this.searchWord);  
  }
}
