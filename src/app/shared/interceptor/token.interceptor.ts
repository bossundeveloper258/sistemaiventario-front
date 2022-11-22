import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';


import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private storageService: StorageService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let currentToken = this.authenticationService.currentTokenValue;
        request = request.clone({
            setHeaders: {
                Accept: `application/json`
            }
        });
        if (currentToken && currentToken.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken.token}`
                }
            });
        }

        // return next.handle(request);

        return next.handle(request).pipe(
            catchError(error => {
                // this.storageService.removeUser();
                // this.router.navigate(['/auth/login'], {
                //     queryParams: {},
                // });
                // if (error instanceof HttpErrorResponse  &&  (error.status === 401 || error.status === 0) ) {
        
                //   return this.handle401Error(request, next);
                //   //return this.handle401Error(authReq, next);
                // }
                return throwError(error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    
        return this.authenticationService.logout().pipe(
            switchMap((token: any) => {
                return next.handle(this.addTokenHeader(request, token.token, token.tokenType));
            }),
            catchError((err) => {

                return throwError(err);
            })
        );
        
    }
    
    private addTokenHeader(request: HttpRequest<any>, token: string , tokenType: string) {
        /* for Node.js Express back-end */
        return request.clone({ setHeaders: { Authorization: `${tokenType} ${token}` } });
    }
}