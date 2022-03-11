import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, Observable, of } from 'rxjs';


export function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
   const password = form.get('password');
   const confirm = form.get('confirmPassword');

   if (!(password?.value && confirm?.value)) return null;
   return password.value === confirm.value ? null : { noMatch: true };
}

export function validateUsernameNotTaken(existingUsernames: Observable<string[] | null>): AsyncValidatorFn {
   return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      if (!existingUsernames) return of(null);

      return existingUsernames.pipe(map(usernames =>
         usernames?.includes(control.value) ? { alreadyExists: true } : null
      ));
   }
}


