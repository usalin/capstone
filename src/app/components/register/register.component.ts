import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { passwordMatchValidator, validateUsernameNotTaken } from 'src/app/validators/passwords-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  existingUsernames: Observable<string[] | null> = this.accountService.getUsernames();
  submitted: boolean = false;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.registerForm.controls['username'].setAsyncValidators(validateUsernameNotTaken(this.existingUsernames));
  };

  createForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email ])
    }, 
    { validators: passwordMatchValidator });
  }

  register() {
    if (this.registerForm.invalid) {  
      this.submitted = true;
      return;
     }
    this.accountService.createUser(this.registerForm.value).subscribe(data => console.log(data));
    this.router.navigate(['/dashboard']);
  }

  getUsernameRequiredError() {
    return (this.registerForm.get('username')?.hasError('required') && this.registerForm.get('username')?.touched && this.registerForm.get('username')?.dirty) ||
           (this.submitted && this.registerForm.get('username')?.hasError('required'));
  }

  getUsernameAlreadyExistsError() {
    return this.registerForm.get('username')?.hasError('alreadyExists') && this.registerForm.get('username')?.touched && this.registerForm.get('username')?.dirty;
  }

  getPasswordRequiredError() {
    return (this.registerForm.get('password')?.hasError('required') && this.registerForm.get('password')?.touched && this.registerForm.get('password')?.dirty) ||
           (this.submitted && this.registerForm.get('password')?.hasError('required'));
  }

  getPasswordConfirmRequiredError() {
    return (this.registerForm.get('confirmPassword')?.hasError('required') && this.registerForm.get('confirmPassword')?.touched && this.registerForm.get('confirmPassword')?.dirty) ||
           (this.submitted && this.registerForm.get('confirmPassword')?.hasError('required'));
  }

  getEmailRequiredError() {
    return (this.registerForm.get('email')?.hasError('required') && this.registerForm.get('email')?.touched && this.registerForm.get('email')?.dirty) || 
           (this.submitted && this.registerForm.get('email')?.hasError('required'));
  } 

  getEmailNotValidError() {
    return this.registerForm.get('email')?.hasError('email') && this.registerForm.get('email')?.touched && this.registerForm.get('email')?.dirty;
  }

  getPasswordsMustMatchError() {
    return this.registerForm.errors;
  }
}
