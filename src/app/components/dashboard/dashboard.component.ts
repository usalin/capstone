import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {  Observable, of } from 'rxjs';
import { Cart } from 'src/app/models/cart.interface';
import { CartItem, Product } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  products$!: Observable<Product[]>;
  searchBy = new FormControl();
  cart$!: Observable<Cart | null>;
  products!: Observable<Product[] | null>;
  quantity = 1;

  // cartItems$!: Observable<CartItem[]>;
  cartItems$: Observable<CartItem[] | null> = of([
    {quantity: 1, productId: 1, shortDescription: 'desc',
      longDescription: 'desc',
      productName: 'desc',
      category: 'desc',
      smallImageUrl: 'desc',
      price: 3,
      largerImageUrl: 'desc',
      // reviews?: Review[];
    }
])

  constructor(private router: Router, private productService: ProductService, private cartService: CartService) { 
    cartService.initialiseCartLocalStorage();
  }

  ngOnInit(): void {

    













    // working searchBy Function
    // this.searchBy.valueChanges.pipe(
    //   startWith(''),
    //   mergeMap(searchWord => this.productService.searchProduct(searchWord))
    // )
    //   .subscribe(console.log);

    // code to remove

  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('cartId')
    this.router.navigate(['/login']);
  }
}

