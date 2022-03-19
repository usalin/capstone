import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent  {

  constructor(public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // ngOnInit(): void {
  //   console.log(this.data);
  // }
  // get merchantName(): string {
  //   return this.data[0];
  // }
  // get amount(): number {
  //   return this.data[1];
  // }

}
