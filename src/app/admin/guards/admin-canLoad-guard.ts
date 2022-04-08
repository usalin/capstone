import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';


@Injectable({
   providedIn: 'root'
})
export class AdminCanLoadGuard implements CanLoad {

   constructor(private router: Router) {  /* ∅ */ }

   canLoad() {
      if (localStorage.getItem('accessToken')) {
         const token = localStorage.getItem('accessToken');
         const role = token ? JSON.parse(atob(token?.split('.')[1]))?.role : null;

         if (role == 'admin') return true;
      }
      this.router.navigate(['/shop']);
      return false;
   }
}
