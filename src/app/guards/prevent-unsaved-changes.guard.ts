import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'shared/services/confirmation.service';
import { AddProductComponent } from '../admin/add-product/add-product.component';

@Injectable({
   providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

   constructor(private confirmationService: ConfirmationService, private router: Router) {}

   canDeactivate(component: AddProductComponent): Observable<boolean> | boolean  {
      if (component.addProductForm.dirty && component.isSubmitted == false) {
         return this.confirmationService.confirm();
      }
        return true;
    }
}
