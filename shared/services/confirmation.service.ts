import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { UnsavedChangesComponent } from 'shared/components/unsaved-changes/unsaved-changes.component';
import { AddProductComponent } from 'src/app/admin/add-product/add-product.component';


@Injectable({
   providedIn: 'root'
})
export class ConfirmationService {

   dialogRef!: MatDialogRef<UnsavedChangesComponent>;

   constructor(private dialog: MatDialog) { }

   confirm(): Observable<boolean> {

      this.dialogRef = this.dialog.open(UnsavedChangesComponent, {
         width: '370px',
         height: '700px',
         hasBackdrop: true,
         backdropClass: 'backdropClass',
         disableClose: true
      });

      return new Observable<boolean>(this.getUserChoice())

   }


   private getUserChoice() {
      return (observer: Observer<boolean>) => {
        this.dialogRef.afterClosed().subscribe((result) => {
            observer.next(result);
            observer.complete();

      })
   }
}}

