import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent  {

  constructor(private productService: ProductService) { /* Ø */}

  addProductForm = new FormGroup({
    shortDescription: new FormControl(), 
    longDescription: new FormControl(), 
    productName: new FormControl(), 
    category: new FormControl(), 
    imageUrl: new FormControl(), 
    price: new FormControl(),
  })

  continue() {
    this.productService.addProduct(this.addProductForm.value).subscribe(console.log);
  }
}
