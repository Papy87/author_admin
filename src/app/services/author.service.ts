import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResponseModel} from "../../models/response/response.model";
import {environment} from "../environments/environments"



@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  authenticated: boolean;

  constructor(private http: HttpClient) {
  }
  private baseUrl = environment.baseUrl;

  getAllAutors(page: number, pageSize: number, name?: string) {
    return this.http.get<ResponseModel>(this.baseUrl + `/authors?page=${page}&pageSize=${pageSize}&name=${name}`)
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

