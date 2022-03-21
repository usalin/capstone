import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?category=${categoryName}`);
  }

  searchProduct(searchWord: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?productName_like=${searchWord}`);
  }
}
