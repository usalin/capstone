import { AbstractControl,  ValidationErrors } from '@angular/forms';


export function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
   const password = form.get('password');
   const confirm = form.get('confirmPassword');

   if (!(password?.value && confirm?.value)) return null;
   return password.value === confirm.value ? null : { noMatch: true };
}
