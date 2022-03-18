import { CategoryDetailsComponent } from './category-details/category-details.component';
import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  { path: '', component: ShopComponent, pathMatch: 'full' },
  { path: 'products/search', component: ProductSearchComponent, pathMatch: 'full' },
  { path: 'products/:id', component: ProductDetailsComponent, pathMatch: 'full' },
  { path: 'category/:categoryName', component: CategoryDetailsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
