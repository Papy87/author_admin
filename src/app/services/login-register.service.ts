import {HttpClient} from '@angular/common/http';
import {Injectable, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {ResponseModel} from "../../models/response/response.model";

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class LoginRegisterService {
  authenticated: boolean;

  constructor(private http: HttpClient, private router: Router) {
  }

  private baseUrl = 'http://localhost:3000';

  loginUser(username: string, password: string) {
    return this.http.post<ResponseModel>(this.baseUrl + '/login', {username, password})
      .pipe(tap(res => {
          this.setSession(res.data)
        },
        (catchError) => console.log(catchError)))
  }

  registerUser(username: string, password: string) {
    return this.http.post<ResponseModel>(this.baseUrl + '/register', {username, password})
  }

  setSession(data) {
    localStorage.setItem('token', data.token);
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/'])
  }

  // @ts-ignore
  isLoggedOut() {
    let token = localStorage.getItem("token");
    if (token) {
      const date = this.getExpiration(token);
      if (!date) {
        return true
      } else if (!(date.valueOf() > new Date().valueOf())) {
        this.logout();
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  // @ts-ignore
  getExpiration(token: string) {
    let tokenInfo = this.getDecodedAccessToken(token); // decode token
    if (tokenInfo === null || tokenInfo === undefined) {
      return false
    } else {
      const date = new Date(0);
      date.setUTCSeconds(tokenInfo.exp);
      return date;
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch {
      return null;
    }
  }

}

