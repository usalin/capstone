import { Auth0Guard } from './guards/auth0.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'shop', canLoad: [AuthGuard], canActivate: [Auth0Guard], loadChildren: () => import('./shop/shop.module').then(module =>module.ShopModule) },
  { path: 'admin', canActivate: [Auth0Guard], loadChildren: () => import('./admin/admin.module').then(module =>module.AdminModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'shop', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

