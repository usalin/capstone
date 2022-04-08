import { Cart } from 'src/app/shop/models/cart.interface';
import { CartService } from 'src/app/shop/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
})
export class OrderConfirmationComponent implements OnInit {

  cart$!: Observable<Cart | null>;
  currentTotal$!: Observable<number>;

  constructor(public dialogRef: MatDialogRef<OrderConfirmationComponent>, private cartService: CartService, private router: Router) { /* ∅ */ }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.currentTotal$ = this.cartService.currentTotal$;
  }

  confirm() {
    this.cartService.createNewCart().subscribe();
    this.dialogRef.close();
    this.router.navigate(['/shop/']);
  }
}
