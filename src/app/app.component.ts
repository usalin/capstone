import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'client';

  constructor(private cartServivce: CartService) {
    this.cartServivce.initialCartLocalStorage();
  }

}
