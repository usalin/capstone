import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  error!: string;
  destroy$ = new Subject();

  constructor(private accountService: AccountService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  login() {
      if (this.loginForm.invalid) {
        this.markControlsDirtyAndTouched();
        return;
      }

    this.accountService.loginLiveUser(this.loginForm.value)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => throwError(err))
      ).subscribe((() => {
         localStorage.removeItem('cartId');
         this.cartService.createNewCart();
         this.router.navigate(['/shop']);
      }))
  }

  //GETTERS TO CLEAN UP TEMPLATE
  getUsernameRequiredError() {
    return (this.loginForm.get('username')?.hasError('required') && this.loginForm.get('username')?.touched && this.loginForm.get('username')?.dirty);
  }

  getPasswordRequiredError() {
    return (this.loginForm.get('password')?.hasError('required') && this.loginForm.get('password')?.touched && this.loginForm.get('password')?.dirty);
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }

  markControlsDirtyAndTouched() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      }
    });
  }
}
