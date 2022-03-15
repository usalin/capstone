import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket } from '../models/basket.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  // basket$ = this.basketSource.asObservable();
   basket$ = of([1,2,3])

  constructor(private http: HttpClient) {  }

   getAllProducts() {
    return this.http.get(`${this.baseUrl}/products`);
   }
   
   getProductsByCategory() {
    return this.http.get(`${this.baseUrl}/products?category=category-1`);
   }

   searchProduct(searchWord: string) {
    return this.http.get(`${this.baseUrl}/products?productName_like=${searchWord}`);
   }

   getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: Basket) => {
          this.basketSource.next(basket);
        })
      );
  }

}
