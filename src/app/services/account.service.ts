import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseInterface } from '../models/login-response.interface';
import { LoginUserInterface } from '../models/login-request.interface';
import { RegisterRequestUserInterface, RegisterResponseUserInterface } from '../models/register-request.interface';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  /**
 * @used as the reference to active Nest.js Server
 * @subject to change when new Server is up
 */
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  createUser(user: RegisterRequestUserInterface) {
    const REGISTER_URL = `${this.baseUrl}/auth/signup`;
    return this.http.post<RegisterResponseUserInterface>(REGISTER_URL, user, {observe: 'response'});
  }

  loginUser(userData: LoginUserInterface) {
    const LOGIN_URL = `${this.baseUrl}/auth/signin`;

    return this.http.post<LoginResponseInterface>(LOGIN_URL, userData, {observe: 'response'});
  }
}
