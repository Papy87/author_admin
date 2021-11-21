import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {ResponseModel} from "../../models/response/response.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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


  getAllAutors(page: number, pageSize: number) {
    return this.http.get<ResponseModel>(this.baseUrl + `/authors?page=${page}&pageSize=${pageSize}`)

  }

  setSession(data) {
    localStorage.setItem('token', data.token);
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/'])
  }


}

