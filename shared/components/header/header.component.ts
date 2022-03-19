import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  searchBy = new FormControl();
  scrWidth: any;

  constructor(private router: Router, private toastr: ToastrService, private dialog: MatDialog)
  {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrWidth = window.innerWidth;

    const x = document.getElementById("main-nav");
    if (x) {
      if (this.scrWidth > 800) {
        x.style.display = "grid";
      }
      else if (this.scrWidth <= 800) {
        x.style.display = "none";
      }
    }
  }

  toggleNavbar() {
    const x = document.getElementById("main-nav")
    if (x?.style.display === "grid") {
      x.style.display = "none";
    } else {
      x!.style.display = "grid";
    }
  }

  search() {
    if (this.searchBy.value.length < 3)  { 
      this.toastr.error('Search term should be at least 3 characters long');
      return;
     }
    this.router.navigate(['/shop/products/search', { search: this.searchBy.value }]);
  }

  cart() {
   this.openCartDialog();
  }

  openCartDialog() {

    //whatever initial data to pass to the component
    // const data = [this.paymentForm.value.receiver, this.paymentForm.value.amount];
    const dialogRef = this.dialog.open(CartComponent, {
      width: '370px',
      height: '700px',
      // id: 'parent',
      // data: data,
      hasBackdrop: true,
      backdropClass: 'backdropClass',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('submitted');
        // const newTransaction: ApiTransactionModel = {
        //   merchant:
        //     { name: data[0], accountNumber: '555' },
        //   dates: {
        //     valueDate: new Date()
        //   },
        //   categoryCode: '#12a580',
        //   transaction: {
        //     type: 'Card Payment',
        //     creditDebitIndicator: 'DBIT',
        //     amountCurrency: {
        //       amount: data[1],
        //       currencyCode: 'EUR'
        //     }
        //   }
        // };
      }
      else {
        console.log('cancelled');
      }
    }
    );

  }
}
