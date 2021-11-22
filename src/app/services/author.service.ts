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

  getAllAutors(page: number, pageSize: number) {
    return this.http.get<ResponseModel>(this.baseUrl + `/authors?page=${page}&pageSize=${pageSize}`)
  }

  setSession(data) {
    localStorage.setItem('token', data.token);
  }

  addAuthor(data: object) {
    return this.http.post<ResponseModel>(this.baseUrl + `/author`, data)
  }

  editAuthor(id: number, data: object) {
    return this.http.put<ResponseModel>(this.baseUrl + `/author/` + id, data)
  }

  deleteAuthor(id: number) {
    return this.http.delete<ResponseModel>(this.baseUrl + `/author/` + id)
  }

  getAuthorInfo(authorId: number) {
    return this.http.get<ResponseModel>(this.baseUrl + `/author/` + authorId)
  }

}

