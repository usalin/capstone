import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem, Product } from '../models/product.interface';
import * as uuid from 'uuid';
import { Cart, CartClass, CartCostDivision } from '../models/cart.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  private cartSource = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSource.asObservable();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private cartTotalSource = new BehaviorSubject<CartCostDivision | null>(null);
  cartTotal$ = this.cartTotalSource.asObservable();
  shipping = 0;
  vatPercent = 18;
  vat = 0;


  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?category=${categoryName}`);
  }

  searchProduct(searchWord: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?productName_like=${searchWord}`);
  }
}
