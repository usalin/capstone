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
export class DashboardComponent {

  constructor(private router: Router) {  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('cartId')
    this.router.navigate(['/login']);
  }
}

