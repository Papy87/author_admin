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

export class BookService {
  constructor(private http: HttpClient, private router: Router) {
  }

  private baseUrl = 'http://localhost:3000';


  getAurhorBooks(authorId, pageSize, pageNumber: number) {
    return this.http.get<ResponseModel>(this.baseUrl + `/books?authorId=${authorId}&page=${pageNumber}&pageSize=${pageSize}`)
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
