import { CATEGORY_LIST } from 'shared/mock-data';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shop/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent  {

  isSubmitted = false;
  categoryList = CATEGORY_LIST;

  constructor(private productService: ProductService, private router: Router) { /* Ø */}

  addProductForm = new FormGroup({
    shortDescription: new FormControl('', Validators.required), 
    longDescription: new FormControl(), 
    productName: new FormControl('', Validators.required), 
    category: new FormControl('', Validators.required), 
    imageUrl: new FormControl(), 
    price: new FormControl('', Validators.required),
  })

  continue() {

    if (this.addProductForm.invalid) {
      this.markControlsDirtyAndTouched();
      return;
    }


    this.isSubmitted = true;
    this.addProductForm.get('imageUrl')?.setValue(localStorage.getItem('imageUrl') || 'No Image');
    localStorage.removeItem('imageUrl');
    this.productService.addProduct(this.addProductForm.value).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/admin'])
    });
  }

  getProductNameRequiredError() {
    return (this.addProductForm.get('productName')?.hasError('required') && this.addProductForm.get('productName')?.touched && this.addProductForm.get('productName')?.dirty);
  }

  getShortDescriptionRequiredError() {
    return (this.addProductForm.get('shortDescription')?.hasError('required') && this.addProductForm.get('shortDescription')?.touched && this.addProductForm.get('shortDescription')?.dirty);
  }

  getCategoryRequiredError() {
    return (this.addProductForm.get('category')?.hasError('required') && this.addProductForm.get('category')?.touched && this.addProductForm.get('category')?.dirty);
  }

  getPriceRequiredError() {
    return (this.addProductForm.get('price')?.hasError('required') && this.addProductForm.get('price')?.touched && this.addProductForm.get('price')?.dirty);
  }

  markControlsDirtyAndTouched() {
    Object.keys(this.addProductForm.controls).forEach(field => {
      const control = this.addProductForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      }
    });
  }
}
