import { Cart } from 'src/app/models/cart.interface';
import { CartItem } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent  {

  currentTotal$!: Observable<number>;
  cart$!: Observable<Cart | null>;

  constructor(public dialogRef: MatDialogRef<CartComponent>, private cartService: CartService, private router: Router) { /* Ø */}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.currentTotal$ = this.cartService.currentTotal$;
  }

  removeAll() {
    this.cartService.emptyCart();
    this.router.navigate(['/shop/']);
    this.dialogRef.close();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    const cart = this.cartService.setCartItem(cartItem, true);
    if (cart!= null) this.cartService.updateCart(cart).subscribe(); 
  }

  incrementQuantity(cartItem: CartItem) {
    cartItem.quantity++;
    
    const cart = this.cartService.setCartItem(cartItem, true);
    if (cart!= null) this.cartService.updateCart(cart).subscribe();
  }
}
