import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRegisterService} from "../../services/login-register.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  logedout: boolean;

  constructor(private loginRegisterService: LoginRegisterService, private router: Router, private snackbar: MatSnackBar, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.initForm()
    this.logedout = this.isLogOut()
    if(!this.logedout){
      this.router.navigate(['author'])
    }
  }
  private initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    })
  }

  private showSnackBarMessage(message: string, type?: string) {
    const config = {duration: 2500};
    if (type) {
      config['panelClass'] = type;
    }
    this.snackbar.open(message, '', config);
  }

  isLogOut() {
    return this.loginRegisterService.isLoggedOut()
  }

  onSubmit(): void {
    // @ts-ignore
    let password = this.form.value['password']
    // @ts-ignore
    let username = this.form.value['username']

    if (!username || !password) {
      this.errorMessage = 'Molim vas unesite sve neophodne podatke.'
      return
    }
    this.form.reset()
    this.loginRegisterService.loginUser(username, password).subscribe(
      data => {
        this.renderer.removeStyle(document.body, "background-image");
        this.showSnackBarMessage(data.message, 'success');
        this.router.navigate(['authors'])
      },
      error => {
        this.showSnackBarMessage(error.error.message, 'error');
      }
    )
  }
}
