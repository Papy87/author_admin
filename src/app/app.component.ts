import {Component, Renderer2} from '@angular/core';
import {LoginRegisterService} from "./services/login-register.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AuthorAdmin';

}
