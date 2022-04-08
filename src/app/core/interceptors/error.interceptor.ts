import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastr: ToastrService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error) {
                    if (error.status === 400) {
                        if (error.error.errors) {
                            throw error.error;
                        } else {
                            error.error?.message.map((message: string | undefined) => this.toastr.error(message));
                        }
                    }
                    if (error.status === 401) {
                        if (this.router.url == '/login') {
                            this.toastr.error(`${error.error?.message}`);
                        }
                        else {
                            this.toastr.error(`Error Code: ${error.error.statusCode}. You need to login to access content`);
                        }
                    }
                    //   if (error.status === 404) {
                    //       this.router.navigateByUrl('/not-found');
                    //   }
                    if (error.status === 500) {
                        const navigationExtras: NavigationExtras = { state: { error: error.error } };
                        this.router.navigateByUrl('/server-error', navigationExtras);
                    }
                }
                return throwError(error);
            })
        );
    }
}
