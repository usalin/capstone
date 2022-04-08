import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shop/models/product.interface';

@Component({
  selector: 'app-adv-search-card',
  templateUrl: './adv-search-card.component.html',
})
export class AdvSearchCardComponent {

  @Input() products!: Product[] | null;

  constructor() { /* ∅ */ }
}
