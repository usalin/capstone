import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shop/models/product.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {

  @Input() products$!: Observable<Product[]>;

  public displayedColumns = ['productName', 'shortDescription', 'category', 'imageUrl', 'price', 'actions' ];
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource = new MatTableDataSource<Product>();

  constructor(private router: Router) {/* Ø */ }

  ngOnInit() {
    this.products$.subscribe(
      (data: Product[]) => {
        this.dataSource.data = data;
      }
    ) 
   }

  viewProduct(id: string) {
    this.router.navigate([`/shop/products/${id}`]);
  }
}
