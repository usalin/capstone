import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  searchBy = new FormControl();
  scrWidth: any;

  constructor(private router: Router) {
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
    console.log('logging from search', this.searchBy.value);
    this.router.navigate(['/shop/products/search', { search: this.searchBy.value }]);
  }

  cart() {
    console.log('logging from cart');
  }
}
