import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public get<T>(url: string, options: any = {}): Observable<T>{
    return this.httpClient.get<T>(`${this.apiUrl}/${url}`, options).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    )
  }

  public post<T>(url: string, data: any, options?: any ): Observable<T>{
    return this.httpClient.post<T>(`${this.apiUrl}/${url}`, data, options).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    )
  }

  public put<T>(url: string, data: any, options?: any ): Observable<T>{
    return this.httpClient.put<T>(`${this.apiUrl}/${url}`, data, options).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    )
  }

  public delete<T>(url: string, options: any = {}): Observable<T>{
    return this.httpClient.delete<T>(`${this.apiUrl}/${url}`, options).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    )
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
