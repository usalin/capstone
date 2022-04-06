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
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdvSearchCardComponent } from './advanced-search/adv-search-card/adv-search-card.component';
import { FlagshipProductComponent } from './flagship-product/flagship-product.component';
import { ProductCardListComponent } from './product-card/product-card.component';


@NgModule({
  declarations: [
    ShopComponent,
    CategoryDetailsComponent,
    ProductDetailsComponent,
    ProductSearchComponent,
    OrderReviewComponent,
    ProductCardListComponent,
    AdvancedSearchComponent,
    AdvSearchCardComponent,
    FlagshipProductComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ShopModule { }
