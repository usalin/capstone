import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUserInterface } from '../models/login-request.interface';
import { RegisterRequestUserInterface, RegisterResponseUserInterface } from '../models/register-request.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    /**
   * @used as the current baseUrl.
   * @subject to change when Nest server is up
   */
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {  }

  /**
   * 
   * @returns existing usernames
   * @used as a utility function for the async validateUsernameNotTaken validator.
   */
  getUsernames(): Observable<string[] | null> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      map((data: User[]) => {
        if (data) {
          const usernames = data.map(data => data.username);
          return usernames;
        }
        return (null);
      }),
      catchError(this.handleError)
    );
  }

  createUser(user: RegisterRequestUserInterface) {
    const API_URL = `${this.baseUrl}/users`;
    return this.http.post<RegisterResponseUserInterface>(API_URL, user).pipe(
      map((data: RegisterResponseUserInterface) => {
        if (data) return true;
        else return new Error('Could not create a user');
      })
    );
  }

  loginUser(userData: LoginUserInterface) {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      map((data: User[]) => {
        if (data) {
          for (let value of data) {
            if ((userData.username == value.username) && (userData.password == value.password)) {
              localStorage.setItem('username', userData.username);
              return true;
            }          
          }
          if (!userData.username && !userData.password) return new Error("You must fill the form to login");
          return new Error('Username or password is incorrect.');
        }
        else return new Error ('Unknown error.');
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
