import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, mergeMap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  searchBy = new FormControl();
  scrWidth: any;



  constructor(private productService: ProductService) {
    this.getScreenSize();

  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrWidth = window.innerWidth;
    console.log(this.scrWidth);

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

  ngOnInit(): void {

  }
  //     this.searchBy.valueChanges.pipe(
  //   startWith(''),
  //   mergeMap(searchWord => this.productService.searchProduct(searchWord))
  // )
  //   .subscribe(console.log);


  myFunction() {
    const x = document.getElementById("main-nav")
    if (x?.style.display === "grid") {
      x.style.display = "none";
    } else {
      x!.style.display = "grid";
    }
  }
  search() {
    console.log('logging from search');
  }

  cart() {
    console.log('logging from cart');
  }
}
