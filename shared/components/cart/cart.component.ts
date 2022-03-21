import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent  {

  cartItems: CartItem[] = [];
  currentTotal = 0;

  constructor(public dialogRef: MatDialogRef<CartComponent>, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart()?.items;
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
