import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatDialogModule
  ]
})
export class SharedModule { }
