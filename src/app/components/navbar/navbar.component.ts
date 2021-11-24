import {Component, OnInit} from '@angular/core';
import {LoginRegisterService} from "../../services/login-register.service";
import jwtDecode from "jwt-decode";
import { Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: object;
  authorId: number;
  isAdmin: boolean;
  showBooks: boolean;
  activeRoute: string;
  component: any;
  logedout:boolean;

  constructor(private loginRegisterService: LoginRegisterService, private route: Router, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.token = jwtDecode(localStorage.getItem("token"));
    // @ts-ignore
    this.authorId = this.token.authorId;
    // @ts-ignore
    this.isAdmin = this.token.isAdmin;
    this.activeRoute = this.route.url;
    this.logedout = this.isLogOut()
    if(this.logedout){
      this.loginRegisterService.logout()
      this.showSnackBarMessage("Token expired", 'error');

    }
  }

  private showSnackBarMessage(message: string, type?: string) {
    const config = {duration: 2500, width:'250px'};
    if (type) {
      config['panelClass'] = type;
    }
    this.snackbar.open(message, '', config);
  }


  onLogout() {
    this.loginRegisterService.logout()
    this.showSnackBarMessage("User logout successful", 'snackbar-success')

  }
  isLogOut() {
    return this.loginRegisterService.isLoggedOut()
  }
}
