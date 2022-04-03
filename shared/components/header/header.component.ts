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

  constructor(private router: Router, private toastr: ToastrService, private dialog: MatDialog) {
    this.getScreenSize();
  }

  /**
   * 
   * @param event NEEDED TO IMPLEMENT CUSTOM TOOLBAR
   */
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrWidth = window.innerWidth;

    const mainNavElement = document.getElementById("main-nav");
    if (mainNavElement) {
      if (this.scrWidth > 800) {
        mainNavElement.style.display = "grid";
      }
      else if (this.scrWidth <= 800) {
        mainNavElement.style.display = "none";
      }
    }
  }

   /**
   * 
   * @param function NEEDED TO IMPLEMENT CUSTOM TOOLBAR
   */
  toggleNavbar() {
    const mainNavElement = document.getElementById("main-nav")
    if (mainNavElement?.style.display === "grid") {
      mainNavElement.style.display = "none";
    } else {
      mainNavElement!.style.display = "grid";
    }
  }

  search() {
    if (!this.searchBy.value || this.searchBy.value?.length < 3) {
      this.toastr.error('Search term should be at least 3 characters long');
      return;
    }
    this.router.navigate(['/shop/products/search', { search: this.searchBy.value }]);
  }

  openCartModal() {
    this.openCartDialog();
  }

  openCartDialog() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '370px',
      height: '700px',
      hasBackdrop: true,
      backdropClass: 'backdropClass',
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/shop/order/review']);
      }
    });
  }
}
