import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanLoad {
   constructor(private router: Router) { /* ∅ */ }

   canLoad() {
      if (localStorage.getItem('accessToken')) return true;
      return this.router.navigate(['/login']);
   }
}
