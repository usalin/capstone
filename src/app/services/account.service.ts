import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUserInterface } from '../models/login-request.interface';
import { RegisterRequestUserInterface } from '../models/register-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {  }

  /**
   * 
   * @returns existing usernames
   * @used as a utility function for the async validateUsernameNotTaken validator.
   */
  getUsernames(): Observable<string[] | null> {
    return this.http.get<any>(`${this.baseUrl}/users`).pipe(
      map((data: any[]) => {
        if (data) {
          const usernames = data.map(data => data.username);
          return (usernames);
        }
        return (null);
      }),
      catchError(this.handleError)
    );
  }

  createUser(user: RegisterRequestUserInterface) {
    const API_URL = `${this.baseUrl}/users`;
    return this.http.post(API_URL, user);
  }

  loginUser(userData: LoginUserInterface) {
    return this.http.get<any>(`${this.baseUrl}/users`).pipe(
      map((data: any[]) => {
        if (data) {
          for (let value of data) {
            if ((userData.username == value.username) && (userData.password == value.password)) {
              localStorage.setItem('username', userData.username);
              return (true);
            }          
          }
          if (!userData.username && !userData.password) return "You must fill the form to login";
          return ('Username or password is incorrect.')
        }
        else return ('Unknown error.');
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error code ${error.status}, ` +
        `Error message: ${error.message}`);
    }
    return throwError(
      'Something went wrong. Please try again later.');
  };
}
