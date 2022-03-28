import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent implements OnInit {
  
  products$!: Observable<Product[]>;
  searchWord!: string;

  constructor(private route: ActivatedRoute,private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchWord = params['search'];
      this.getProductsForSearchWord();
    });
  }

  getProductsForSearchWord() {
    this.products$ = this.productService.getProductBySearch(this.searchWord);  
  }
}
