import { Auth0Guard } from './guards/auth0.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { DesignComponent } from '../../shared/components/design/design.component';

const routes: Routes = [
  { path: 'shop', canActivate: [Auth0Guard], loadChildren: () => import('./shop/shop.module').then(module =>module.ShopModule) },
  { path: 'admin', canActivate: [Auth0Guard], loadChildren: () => import('./admin/admin.module').then(module =>module.AdminModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: 'shop', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

