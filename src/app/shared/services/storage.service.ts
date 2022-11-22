import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private authLocalStorage = `_user`;
  private tokenStorage = `_token`;

  constructor() { }

  setToken(token: any)
  {
    localStorage.setItem( this.tokenStorage , JSON.stringify(token));
  }

  getToken(): any
  {
    return localStorage.getItem(this.tokenStorage);
  }

  setUser(auth: any)
  {
    localStorage.setItem( this.authLocalStorage , JSON.stringify(auth) )
  }

  getUser(): any{
    return localStorage.getItem(this.authLocalStorage);
  }

  removeUser()
  {
    localStorage.removeItem(this.authLocalStorage);
    localStorage.removeItem(this.tokenStorage);
  }

}
