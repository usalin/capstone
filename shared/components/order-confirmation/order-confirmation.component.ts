import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
})
export class OrderConfirmationComponent implements OnInit {

  cartItems: CartItem[] = [];
  currentTotal = 0;

  constructor(public dialogRef: MatDialogRef<OrderConfirmationComponent>, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart()?.items;
    this.currentTotal = this.cartService.calculateCartTotal();
  }

  confirm() {
    this.cartService.emptyCart();
    this.router.navigate(['/shop/']);
    this.dialogRef.close();
  }
}
