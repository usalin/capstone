
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { AdvSearchCardComponent } from './components/advanced-search/adv-search-card/adv-search-card.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CommonModule } from '@angular/common';
import { FlagshipProductComponent } from './components/flagship-product/flagship-product.component';
import { NgModule } from '@angular/core';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { ProductCardListComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';

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
