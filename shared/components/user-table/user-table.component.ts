import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {

  @Input() products$!: Observable<Product[]>;

  public displayedColumns = ['productName', 'category', 'imageUrl', 'price', 'actions' ];
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource = new MatTableDataSource<Product>();



  constructor(private productService: ProductService, private router: Router) {/* Ø */ }

  ngOnInit() {
    this.products$.subscribe(
      (data: Product[]) => {
        this.dataSource.data = data;
      }
    ) 
   }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  viewProduct(id: string) {
    this.router.navigate([`/shop/products/${id}`]);
  }
}
