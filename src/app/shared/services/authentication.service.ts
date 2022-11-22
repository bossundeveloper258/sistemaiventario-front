import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.type';
import { Token } from '../interfaces/token.type';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

const USER_AUTH_API_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private currentTokenSubject: BehaviorSubject<Token>;

    constructor(
        private http: HttpClient,
        private storageService: StorageService,
        private router: Router,
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse( this.storageService.getUser() ));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse( this.storageService.getToken() )); 
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentTokenValue(): Token {
        return this.currentTokenSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(USER_AUTH_API_URL + '/login', { email: username, password })
        .pipe(
            map(t => {
                if (t) {
                    this.storageService.setToken( t.data );
                    this.currentTokenSubject.next( t.data );
                }
                return t;
            }),
            switchMap(() => this.getUserByToken()),
        );
    }

    logout(): Observable<any> {
      
      return this.http.get<any>( USER_AUTH_API_URL + '/logout' )
        .pipe(
            map((res: any) => {
              console.log("fdfdfsdfd")
              this.storageService.removeUser();
              this.currentTokenSubject.next(null);
              this.currentUserSubject.next(null);
              this.router.navigate(['/auth/login'], {
                queryParams: {},
              });
              return true;
            })
            
          );
    }

    private getUserByToken(): Observable<User>{
        const auth = this.getAuthFromLocalStorage();
        console.log(auth, "authauthauthauth");
        if (auth != undefined ) {
          return of(undefined);
        }
        return this.http.get<any>( USER_AUTH_API_URL + '/me' )
        .pipe(
            map((user: any) => {
              if (user) {
                this.storageService.setUser(user);
                this.currentUserSubject.next(user);
              } else {
                this.logout();
              }
              return user;
            })
            
          );
    }

    private getAuthFromLocalStorage(): User | undefined {
        try {
          const lsValue = this.storageService.getUser();
          if (!lsValue) return undefined;
          const authData = JSON.parse(lsValue);
          return authData;
        } catch (error) {
          return undefined;
        }
    }

    private handleError(httpError: HttpErrorResponse): Observable<any>
  {
    if(httpError.error instanceof ErrorEvent){
      return throwError(httpError.error.message);
    }else{
      if(httpError.status === 401) return throwError('No Autorizado');
      else return throwError(httpError.error);
    }
  }
}