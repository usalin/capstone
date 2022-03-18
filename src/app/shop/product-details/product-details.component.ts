import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { CartItem, Product } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {

  id!: number;
  quantity = 1;

  constructor(private route: ActivatedRoute, private cartService: CartService) { }







  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  addProductToCart(productItem: Product) {
    const cartItem: CartItem = {
      ...productItem,
      quantity: this.quantity
    };

    this.cartService.setCartItem(cartItem);
  }

  deleteCartItem(cartItem: Product) {
    this.cartService.deleteCartItem(cartItem.productId);
  }

  emptyCart() {
    this.cartService.emptyCart();
  }
  
  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
