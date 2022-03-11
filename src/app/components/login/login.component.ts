import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  error!: string;
  destroy$ = new Subject();

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  login() {
    this.accountService.loginUser(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean | string) => {
        if (typeof data === 'string') this.error = data;
        else this.router.navigate(['/dashboard']);
      });
  }

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
}
