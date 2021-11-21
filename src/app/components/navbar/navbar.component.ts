import {Component, OnInit} from '@angular/core';
import {LoginRegisterService} from "../../services/login-register.service";
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: object;
  authorId: number;
  isAdmin:boolean;
  showBooks:boolean;

  constructor(private loginRegisterService: LoginRegisterService, private route: Router) {
  }

  ngOnInit(): void {
    this.token = jwtDecode(localStorage.getItem("token"));
    // @ts-ignore
    this.authorId = this.token.authorId;
    // @ts-ignore
    this.isAdmin=this.token.isAdmin;
  }


  onLogout() {
    this.loginRegisterService.logout()
  }


  myBooks() {
    this.route.navigate(["author/", this.authorId, "books"], {
      queryParams: {page: 0, pageSize: 10}
    })
  }
  authors() {
    this.route.navigate(["author"], {
      queryParams: {page: 0, pageSize: 10}
    })
  }
}
