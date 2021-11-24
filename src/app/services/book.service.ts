import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResponseModel} from "../../models/response/response.model";
import {environment} from "../environments/environments"


@Injectable({
  providedIn: 'root'
})

export class BookService {
  constructor(private http: HttpClient) {
  }
  private baseUrl = environment.baseUrl;

  getAurhorBooks(authorId, pageSize, pageNumber: number,title:string) {
    return this.http.get<ResponseModel>(this.baseUrl + `/books?authorId=${authorId}&page=${pageNumber}&pageSize=${pageSize}&title=${title}`)
  }
  addBook(data: any) {
    return this.http.post<ResponseModel>(this.baseUrl + `/book`, data)
  }

  editBook(id: number, data: any) {
    return this.http.put<ResponseModel>(this.baseUrl + `/book/` + id, data)
  }

  delteBook(id: number) {
    return this.http.delete<ResponseModel>(this.baseUrl + `/book/` + id)
  }

}
