import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card.component.html',
})
export class ProductCardListComponent implements OnInit {

  @Input() products!: Product[] | null;

  constructor() { }

  ngOnInit(): void { }
}
