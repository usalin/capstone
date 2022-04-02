import { ActivatedRoute } from '@angular/router';
import { CartItem, Product } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {

  id!: string;
  quantity = 1;
  product$!: Observable<Product>;

  constructor(private route: ActivatedRoute, private cartService: CartService, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getProduct();
    });
  }

  getProduct() {
    this.product$ = this.productService.getProductById(this.id);
  }

  addProductToCart(productItem: Product) {
    const cartItem: CartItem = {
      ...productItem,
      quantity: this.quantity
    };
     const cart = this.cartService.setCartItem(cartItem);
     if (cart!= null) {
       cart.total = this.cartService.calculateCartTotal();
       this.cartService.updateCart(cart).subscribe(console.log);
       this.toastr.success('Product succesfully added to your cart!'); 
    }

  }

  emptyCart() {
    this.cartService.emptyCart();
  }
  
  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) { this.quantity--; }
  }
}
