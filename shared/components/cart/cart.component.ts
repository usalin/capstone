import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.interface';
import { CartItem } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent  {

  currentTotal = 0;
  cart$! : Observable<Cart>;

  constructor(public dialogRef: MatDialogRef<CartComponent>, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCart();
    this.cart$ = this.cartService.cart$;
    this.calculateTotal();
  }

  removeAll() {
    this.cartService.emptyCart();
    this.router.navigate(['/shop/']);
    this.dialogRef.close();
  }

  cancel() {
  }

  submit() {
    
  }

  calculateTotal() {
    this.currentTotal = this.cartService.calculateCartTotal();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    this.cartService.setCartItem(cartItem, true);
    this.calculateTotal();
  }

  incrementQuantity(cartItem: CartItem) {
    cartItem.quantity++;
    this.cartService.setCartItem(cartItem, true);
    this.calculateTotal();
  }
}
