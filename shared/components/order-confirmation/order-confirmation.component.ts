import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.interface';
import { CartItem } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
})
export class OrderConfirmationComponent implements OnInit {

  cart$!: Observable<Cart|null>;
  currentTotal$!: Observable<number>;

  constructor(public dialogRef: MatDialogRef<OrderConfirmationComponent>, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.currentTotal$ = this.cartService.currentTotal$;
  }

  confirm() {
    this.cartService.createNewCart();

    this.router.navigate(['/shop/']);
    this.dialogRef.close();
  }
}
