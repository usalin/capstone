import { AccountService } from '../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'shared/validators/custom.validators';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  destroy$ = new Subject();
  error!: string;
  isAdmin =  new FormControl();

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  };

  createForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
      { validators: passwordMatchValidator });
  }

  register() {
    //TO STIMULATE ERROR MESSAGES ON INVALID SUBMIT
    if (this.registerForm.invalid) {
      this.markControlsDirtyAndTouched();
      return;
    }
    const role = this.isAdmin.value ? 'admin' : 'user';
    const { confirmPassword, ...userData } = this.registerForm.value;
    this.accountService.createUser({ ...userData, role })
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) =>  {
        if (response.status === 201) {
          this.router.navigate(['/login']);
        }
      }); 
  }

  /**
   * GETTERS TO CLEAN UP LOGIC FROM THE TEMPLATE
   */
  getUsernameRequiredError() {
    return (this.registerForm.get('username')?.hasError('required') && this.registerForm.get('username')?.touched && this.registerForm.get('username')?.dirty);
  }

  getUsernameAlreadyExistsError() {
    return this.registerForm.get('username')?.hasError('alreadyExists') && this.registerForm.get('username')?.touched && this.registerForm.get('username')?.dirty;
  }

  getPasswordRequiredError() {
    return (this.registerForm.get('password')?.hasError('required') && this.registerForm.get('password')?.touched && this.registerForm.get('password')?.dirty);
  }

  getPasswordConfirmRequiredError() {
    return (this.registerForm.get('confirmPassword')?.hasError('required') && this.registerForm.get('confirmPassword')?.touched && this.registerForm.get('confirmPassword')?.dirty);
  }

  getPasswordsMustMatchError() {
    return this.registerForm.errors;
  }

  /**
   * NEEDED TO MANUALLY ACTIVATE ERROR MECHANISM AFTER INVALID FORM SUBMIT
   */

  markControlsDirtyAndTouched() {
    Object.keys(this.registerForm.controls).forEach(field => {
      const control = this.registerForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
