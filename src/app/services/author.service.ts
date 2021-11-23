import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResponseModel} from "../../models/response/response.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  authenticated: boolean;

  constructor(private http: HttpClient) {
  }
  private baseUrl = 'http://localhost:3000';
  getAllAutors(page: number, pageSize: number, name?: string) {
    return this.http.get<ResponseModel>(this.baseUrl + `/authors?page=${page}&pageSize=${pageSize}&name=${name}`, httpOptions)
  }

  addAuthor(data: object) {
    return this.http.post<ResponseModel>(this.baseUrl + `/author`, data, httpOptions)
  }

  editAuthor(id: number, data: object) {
    return this.http.put<ResponseModel>(this.baseUrl + `/author/` + id, data, httpOptions)
  }

  deleteAuthor(id: number) {
    return this.http.delete<ResponseModel>(this.baseUrl + `/author/` + id, httpOptions)
  }

  getAuthorInfo(authorId: number) {
    return this.http.get<ResponseModel>(this.baseUrl + `/author/` + authorId, httpOptions)
  }
}

