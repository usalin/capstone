import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  constructor(private router: Router, private productService: ProductService) {  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(console.log);
  }
  
  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
 }
