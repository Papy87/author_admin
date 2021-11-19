import {HttpClient} from '@angular/common/http';
import {Injectable, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {ResponseModel} from "../../models/response/response.model";


@Injectable({
  providedIn: 'root'
})

export class AuthorService {
  authenticated: boolean;
  constructor(private http: HttpClient, private router: Router) {
  }

  private baseUrl = 'http://localhost:3000';



  registerUser(username: string, password: string, email: string) {
    return this.http.post<ResponseModel>(this.baseUrl + '/register', {username, password, email})
  }


  getAllAutors(){
    return this.http.get<ResponseModel>(this.baseUrl + '/authors')

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
  // getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   }
  //   catch (Error) {
  //     return null;
  //   }
  // }
}

