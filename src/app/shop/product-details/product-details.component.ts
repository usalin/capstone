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

  private subscription!: Subscription;
  id!: number;
  quantity = 1;
  product$: Observable<Product> = of(
    {
      "productId": 1,
      "shortDescription": "description 1",
      "productName": "product one",
      "smallImageUrl": "https://via.placeholder.com/150",
      "price": 9.99,
      "largerImageUrl": "https://via.placeholder.com/300",
      "longDescription": "longer description 1",
      "category": "headphones"
    }
  )

  constructor(private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
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
