import { CartComponent } from './components/cart/cart.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    OrderConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatDialogModule,
    MatRadioModule,
    OrderConfirmationComponent,
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
