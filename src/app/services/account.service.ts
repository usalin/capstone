import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {  }

  /**
   * 
   * @returns existing usernames
   * @used as a utility function for the async validateUsernameNotTaken validadot.
   */
  getUsernames(): Observable<string[] | null> {
    return this.http.get<any>(this.baseUrl).pipe(
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
              return (true);
            }          
          }
          if (!passedData.username && !passedData.password) return "You must fill the form to login";
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
