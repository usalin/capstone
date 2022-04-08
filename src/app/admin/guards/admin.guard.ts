import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
   providedIn: 'root'
})
export class AdminGuard implements CanActivate {

   constructor(private router: Router) { /* ∅ */ }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('accessToken')) {
         const token = localStorage.getItem('accessToken');
         const role = token ? JSON.parse(atob(token?.split('.')[1]))?.role : null;

         if (role == 'admin') return true;
      }
      this.router.navigate(['/shop']);
      return false;
   }
}


