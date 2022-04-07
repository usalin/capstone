import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, mergeMap, tap } from 'rxjs';
import { CATEGORY_LIST } from 'shared/mock-data';
import { Product } from 'src/app/shop/models/product.interface';
import { ProductService } from 'src/app/shop/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productId!: string;
  categoryList = CATEGORY_LIST;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) { /* Ø */ }


  editProductForm = new FormGroup({
    shortDescription: new FormControl('', Validators.required), 
    longDescription: new FormControl(), 
    productName: new FormControl('', Validators.required), 
    category: new FormControl('', Validators.required), 
    imageUrl: new FormControl(), 
    price: new FormControl('', Validators.required),
  })

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map((params => params['id'])),
        tap(id => this.productId = id),
        mergeMap((id: string) =>
          this.productService.getProductById(id)
        )).subscribe((data: Product) => {
          this.editProductForm.reset(data);
        });
  }

  continue() {
    if (this.editProductForm.invalid) {
      this.markControlsDirtyAndTouched();
      return;
    }

    this.editProductForm.get('imageUrl')?.setValue(localStorage.getItem('imageUrl') || 'No Image');
    localStorage.removeItem('imageUrl');
    this.productService.updateProduct(this.editProductForm.value, this.productId).subscribe((data) => {
      this.router.navigate(['/admin']);
    });
  }


  getProductNameRequiredError() {
    return (this.editProductForm.get('productName')?.hasError('required') && this.editProductForm.get('productName')?.touched && this.editProductForm.get('productName')?.dirty);
  }

  getShortDescriptionRequiredError() {
    return (this.editProductForm.get('shortDescription')?.hasError('required') && this.editProductForm.get('shortDescription')?.touched && this.editProductForm.get('shortDescription')?.dirty);
  }

  getCategoryRequiredError() {
    return (this.editProductForm.get('category')?.hasError('required') && this.editProductForm.get('category')?.touched && this.editProductForm.get('category')?.dirty);
  }

  getPriceRequiredError() {
    return (this.editProductForm.get('price')?.hasError('required') && this.editProductForm.get('price')?.touched && this.editProductForm.get('price')?.dirty);
  }

  markControlsDirtyAndTouched() {
    Object.keys(this.editProductForm.controls).forEach(field => {
      const control = this.editProductForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      }
    });
  }
}
