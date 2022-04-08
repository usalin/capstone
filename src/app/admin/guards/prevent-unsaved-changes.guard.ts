import { AddProductComponent } from '../components/add-product/add-product.component';
import { CanDeactivate, Router } from '@angular/router';
import { ConfirmationService } from 'shared/services/confirmation.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
