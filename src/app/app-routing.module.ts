import { AdminGuard } from './admin/guards/admin.guard';
import { Auth0Guard } from './core/guards/auth0.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './core/components/register/register.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'shop', canLoad: [AuthGuard], canActivate: [Auth0Guard], loadChildren: () => import('./shop/shop.module').then(module =>module.ShopModule) },
  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./admin/admin.module').then(module =>module.AdminModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'shop', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

