import { Auth0Guard } from './guards/auth0.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { DesignComponent } from './components/design/design.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [Auth0Guard] },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(module =>module.ShopModule) },
  { path: 'design', component: DesignComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

