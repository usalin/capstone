import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl ='http://localhost:3000/users';

  constructor(private http: HttpClient) {  }

  getUsers() {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data: any[]) => {
        if (data) {
          console.log(data);
          return of(data);
        }
        return of(null);
      })
    );
  }

  createUser(data: any) {
    const API_URL = this.baseUrl;
    return this.http.post(API_URL, data);
  }

  loginUser(passedData: any) {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data: any[]) => {
        if (data) {
          for (let value of data) {
            if ((passedData.username == value.username) && (passedData.password == value.password)) {
              localStorage.setItem('username', passedData.username);
            }          
          }
          return of(data);
        }
        else return of(null);
      })
    );
  }
}
