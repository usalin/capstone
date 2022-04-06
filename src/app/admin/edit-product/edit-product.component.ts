import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { map, mergeMap, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productId!: string;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { /* Ø */ }


  editProductForm = new FormGroup({
    shortDescription: new FormControl(),
    longDescription: new FormControl(),
    productName: new FormControl(),
    category: new FormControl(),
    imageUrl: new FormControl(),
    price: new FormControl(),
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
    this.editProductForm.get('imageUrl')?.setValue(localStorage.getItem('imageUrl') || 'No Image');
    localStorage.removeItem('imageUrl');
    this.productService.updateProduct(this.editProductForm.value, this.productId).subscribe(console.log);
  }
}
