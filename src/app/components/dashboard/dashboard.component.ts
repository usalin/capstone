import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap, Observable, startWith } from 'rxjs';
import { Basket } from 'src/app/models/basket.interface';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products$!: Observable<Product[]>;
  searchBy = new FormControl();
  basket$!: Observable<Basket | number[] | null>;


  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.basket$ = this.productService.basket$;
    // this.loadBasket();

    this.searchBy.valueChanges.pipe(
      startWith(''),
      mergeMap(searchWord => this.productService.searchProduct(searchWord))
    )
      .subscribe(console.log);
  }

  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  loadBasket() {
    // const basketId = localStorage.getItem('basket_id');
    // if (basketId) {
    //   this.productService.getBasket(basketId).subscribe(() => {
    //     console.log('initialised basket');
    //   }, error => {
    //     console.log(error);
    //   });
    // }
  }
}
