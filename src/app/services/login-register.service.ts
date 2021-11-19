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

  registerUser(username: string, password: string, email: string) {
    return this.http.post<ResponseModel>(this.baseUrl + '/register', {username, password, email})
  }

  setSession(data) {
    localStorage.setItem('token', data.token);
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/'])
  }


  // isLoggedOut() {
  //   const date = this.getExpiration();
  //   if (date === null || date === undefined) { return true }
  //   else if (!(date.valueOf() > new Date().valueOf())) { this.logout(); this.router.navigate(['']); return true }
  //   else return false
  //
  // }
  //
  // getType() {
  //   let token = localStorage.getItem("token");
  //   let tokenInfo = this.getDecodedAccessToken(token);
  //   return tokenInfo;
  // }
  // getName() {
  //   let token = localStorage.getItem("token");
  //   let tokenInfo = this.getDecodedAccessToken(token);
  //   return tokenInfo.username;
  // }
  // getId() {
  //   let token = localStorage.getItem("token");
  //   let tokenInfo = this.getDecodedAccessToken(token);
  //   return tokenInfo.id;
  // }
  // getExpiration() {
  //   let token = localStorage.getItem("token");
  //   let tokenInfo = this.getDecodedAccessToken(token); // decode token
  //   if (token === null || token === undefined) return null;
  //   else if (token) {
  //     const date = new Date(0);
  //     date.setUTCSeconds(tokenInfo.exp);
  //     return date;
  //   }
  // }
  //
  getDecodedAccessToken(token: string): any {
    console.log('inside',token)
    try {
      console.log('hoce')
      return jwt_decode(token);
    }
    catch (Error) {
      console.log('nece')
      return null;
    }
  }
}

