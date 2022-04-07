import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl = `${environment.baseUrl}/products`;

  constructor(private http: HttpClient) { /* Ø */}

  /**
   * CUSTOMER LEVEL ACCESS METHODS
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}?category=${categoryName}`);
  }

  getProductBySearch(searchWord: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}?search=${searchWord}`);
  }

  /**
   * ADMIN LEVEL ACCESS METHODS
   */
  
  addProduct(product: Product) {
    return this.http.post<Product>(this.productsUrl, product);
  }

  updateProduct(product: Product, id: string) {
    return this.http.patch<Product>(`${this.productsUrl}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(`${this.productsUrl}/${id}`);
  }
}
