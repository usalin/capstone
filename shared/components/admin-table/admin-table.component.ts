import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/shop/models/product.interface';
import { ProductService } from 'src/app/shop/services/product.service';


@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html'
})
export class AdminTableComponent implements OnInit {

  product: Product[] = [];

  public displayedColumns = ['productName', 'shortDescription', 'category', 'imageUrl', 'price', 'actions' ];
  public dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private productService: ProductService, private router: Router) {/* Ø */ }

  ngOnInit(){
    this.getProductInformation();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addProduct() {
    this.router.navigate(['/admin/product/add']);
  }

  editProduct(id: string) {
    this.router.navigate([`/admin/product/${id}`]);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      () => this.getProductInformation()
    );
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
