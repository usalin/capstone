import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { OrderConfirmationComponent } from 'shared/components/order-confirmation/order-confirmation.component';
import { CartItem } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
})
export class OrderReviewComponent implements OnInit {

  checkoutForm!: FormGroup;
  destroy$ = new Subject;
  cartItems: CartItem[] = [];
  currentTotal = 0;

  constructor(private orderService: OrderService, private cartService: CartService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart()?.items;
    this.calculateTotal();
    this.createForm();
  }

  createForm() {
    this.checkoutForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zipcode: new FormControl('', [Validators.required]),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      paymentMethod: new FormControl('cash')
    });
  }

  calculateTotal() {
    this.currentTotal = this.cartService.calculateCartTotal();
  }

  completeOrder() {
    if (!this.checkoutForm.valid)  {
      this.markControlsDirtyAndTouched();
      return;
    }
    
    this.orderService.createOrder(this.checkoutForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe();

    this.openConfirmationModal();
      
  }

  openConfirmationModal() {
    const dialogRef = this.dialog.open(OrderConfirmationComponent, {
      width: '370px',
      height: '700px',
      hasBackdrop: true,
      backdropClass: 'backdropClass',
      disableClose: true
    });
  }
  /**
   * ERROR GETTERS
   * @returns if control has specific error result to UI
   */
  getNameRequiredError() {
    return (this.checkoutForm.get('name')?.hasError('required') && this.checkoutForm.get('name')?.touched && this.checkoutForm.get('name')?.dirty);
  }

  getEmailRequiredError() {
    return (this.checkoutForm.get('email')?.hasError('required') && this.checkoutForm.get('email')?.touched && this.checkoutForm.get('email')?.dirty);
  }

  getEmailNotValidError() {
    return this.checkoutForm.get('email')?.hasError('email') && this.checkoutForm.get('email')?.touched && this.checkoutForm.get('email')?.dirty;
  }

  getPhoneRequiredError() {
    return (this.checkoutForm.get('phoneNumber')?.hasError('required') && this.checkoutForm.get('phoneNumber')?.touched && this.checkoutForm.get('phoneNumber')?.dirty);
  }

  getAddressRequiredError() {
    return (this.checkoutForm.get('address')?.hasError('required') && this.checkoutForm.get('address')?.touched && this.checkoutForm.get('address')?.dirty);
  }

  getZipcodeRequiredError() {
    return (this.checkoutForm.get('zipcode')?.hasError('required') && this.checkoutForm.get('zipcode')?.touched && this.checkoutForm.get('zipcode')?.dirty);
  }

  getCityRequiredError() {
    return (this.checkoutForm.get('city')?.hasError('required') && this.checkoutForm.get('city')?.touched && this.checkoutForm.get('city')?.dirty);
  }

  getCountryRequiredError() {
    return (this.checkoutForm.get('country')?.hasError('required') && this.checkoutForm.get('country')?.touched && this.checkoutForm.get('country')?.dirty);
  }

  markControlsDirtyAndTouched() {
    Object.keys(this.checkoutForm.controls).forEach(field => {
      const control = this.checkoutForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
