import {Component, OnInit} from '@angular/core';
import {LoginRegisterService} from "../../services/login-register.service";
import jwt_decode from 'jwt-decode';
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  token: string;

  constructor(private loginRegisterService: LoginRegisterService, private authorsService: AuthorService) {
  }

  ngOnInit(): void {
    this.getToken()
    this.getAuthors()
  }

  getToken() {
    // @ts-ignore
    this.token = jwt_decode(localStorage.getItem("token"));
    console.log(this.token)
  }

  onLogout() {
    this.loginRegisterService.logout()
  }

  getAuthors() {
    this.authorsService.getAllAutors().subscribe(data => {
        console.log(data)
      },
      error => {
        console.log(error)
      })
  }

}
