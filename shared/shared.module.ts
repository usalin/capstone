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
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxMaskModule } from 'ngx-mask';
import {MatIconModule} from '@angular/material/icon';
import { DropzoneDirective } from './components/file-upload/dropzone.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DefaultSkeletonLoaderComponent } from './components/default-skeleton-loader/default-skeleton-loader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    OrderConfirmationComponent,
    UnsavedChangesComponent,
    AdminTableComponent,
    UserTableComponent,
    DropzoneDirective,
    FileUploadComponent,
    DefaultSkeletonLoaderComponent,

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
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatDialogModule,
    MatRadioModule,
    OrderConfirmationComponent,
    MatCheckboxModule,
    ReactiveFormsModule,
    AdminTableComponent,
    UserTableComponent,
    MatFormFieldModule,
    NgxMaskModule,
    MatIconModule,
    DropzoneDirective,
    FileUploadComponent,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule,
    DefaultSkeletonLoaderComponent
  ]
})
export class SharedModule { }
