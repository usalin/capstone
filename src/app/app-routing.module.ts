import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Auth0Guard } from './guards/auth0.guard';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [Auth0Guard] },
  {path: '**', component: LoginComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
