import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';

const routes: Routes = [
  { path: '', component: ShopComponent, pathMatch: 'full' },
  { path: 'products/search', component: ProductSearchComponent, pathMatch: 'full' },
  { path: 'products/:id', component: ProductDetailsComponent, pathMatch: 'full' },
  { path: 'category/:categoryName', component: CategoryDetailsComponent, pathMatch: 'full' },
  { path: 'order/review',  component: OrderReviewComponent, pathMatch: 'full' },
  { path: 'advanced-search', component: AdvancedSearchComponent, pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }


