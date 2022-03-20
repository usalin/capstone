import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from 'shared/shared.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShopComponent,
    CategoryDetailsComponent,
    ProductDetailsComponent,
    ProductSearchComponent,
    OrderReviewComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ShopModule { }
