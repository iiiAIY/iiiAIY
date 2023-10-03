import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {

  }

  setToken(token: string) {
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token')?.toString()

  }

  isLogged() {
    return this.getToken() != null;
  }

  login (userInfo : {email : string, password: string}) : Observable <string | boolean> {
    if (userInfo.email === 'admin@gmail.com' && userInfo.password === '123Admin123!') {
      this.setToken('fdfsdfdsgdfkbjgigj2i453tn354i6b351h0324u24tn54rjytnrghjhn57yijg=okefgoj54');
      return of(true);
    }
    return throwError(() => new Error('Failed Login'))
  }

  logout() {
    localStorage.removeItem('token')
  }
}
