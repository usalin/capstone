import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanLoad {
   constructor(private router: Router) { }

   canLoad() {
      if (localStorage.getItem('accessToken')) return true;
      return this.router.navigate(['/login']);
   }
}
