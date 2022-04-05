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
import { UnsavedChangesComponent } from './components/unsaved-changes/unsaved-changes.component';
import { TableComponent } from './components/table/table.component';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxMaskModule } from 'ngx-mask';
import {MatIconModule} from '@angular/material/icon';
import { DropzoneDirective } from './components/file-upload/dropzone.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    OrderConfirmationComponent,
    UnsavedChangesComponent,
    TableComponent,
    DropzoneDirective,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(),
    MatIconModule
  
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatDialogModule,
    MatRadioModule,
    OrderConfirmationComponent,
    MatCheckboxModule,
    ReactiveFormsModule,
    TableComponent,
    MatFormFieldModule,
    NgxMaskModule,
    MatIconModule,
    DropzoneDirective,
    FileUploadComponent
  ]
})
export class SharedModule { }
