import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResponseModel} from "../../models/response/response.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class BookService {
  constructor(private http: HttpClient) {
  }
  private baseUrl = 'http://localhost:3000';

  getAurhorBooks(authorId, pageSize, pageNumber: number,title:string) {
    return this.http.get<ResponseModel>(this.baseUrl + `/books?authorId=${authorId}&page=${pageNumber}&pageSize=${pageSize}&title=${title}`,httpOptions)
  }
  addBook(data: any) {
    return this.http.post<ResponseModel>(this.baseUrl + `/book`, data,httpOptions)
  }

  editBook(id: number, data: any) {
    return this.http.put<ResponseModel>(this.baseUrl + `/book/` + id, data,httpOptions)
  }

  delteBook(id: number) {
    return this.http.delete<ResponseModel>(this.baseUrl + `/book/` + id,httpOptions)
  }

}
