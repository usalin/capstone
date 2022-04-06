import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-adv-search-card',
  templateUrl: './adv-search-card.component.html',
})
export class AdvSearchCardComponent implements OnInit {

  @Input() products!: Product[] | null;

  constructor() { }

  ngOnInit(): void {
  }

}
