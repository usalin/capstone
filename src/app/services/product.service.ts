import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.interface';
import { Cart, CartCostDivision } from '../models/cart.interface';


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
