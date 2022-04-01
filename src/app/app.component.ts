import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AudioPalace';
  private destroy$ = new Subject();

  constructor(private cartService: CartService) { /* ∅ */  }

  ngOnInit(): void {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      this.cartService.getCart(cartId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => console.log(data));
    }
    else this.cartService.createNewCart()
    .pipe(takeUntil(this.destroy$))
    .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
