import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  product: Product[] = [];

  public displayedColumns = ['productName', 'shortDescription', 'category', 'imageUrl', 'price' ];
  public dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private productService: ProductService) {/* Ø */ }

  ngOnInit(){
    this.getProductInformation();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  getProductInformation(){
    this.productService.getAllProducts()
      .subscribe((products: Product[])=>{
        this.dataSource.data = products;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
