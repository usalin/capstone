import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
})
export class OrderReviewComponent implements OnInit {

  checkoutForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.checkoutForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      paymentMethod: new FormControl('cashOnDelivery', Validators.required)
    });
  }

  createOrder() {
   console.log(this.checkoutForm.value);
  }
}
