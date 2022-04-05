import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard } from '../guards/prevent-unsaved-changes.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: '', component: AdminComponent, pathMatch: 'full' },
  { path: 'product/add', component: AddProductComponent, canDeactivate: [PreventUnsavedChangesGuard], pathMatch: 'full' },
  { path: 'product/:id', component: EditProductComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
