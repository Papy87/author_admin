import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRegisterService} from "../../services/login-register.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private loginRegisterService: LoginRegisterService, private router: Router, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.initForm();
  }

  private showSnackBarMessage(message: string, type?: string) {
    const config = {duration: 2500};
    if (type) {
      config['panelClass'] = type;
    }
    this.snackbar.open(message, '', config);
  }

  private initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    })
  }



  onSubmit(): void {

    // @ts-ignore
    let password = this.form.value['password']
    // @ts-ignore
    let username = this.form.value['username']

    if (!username || !password ) {
      this.errorMessage = 'Molim vas unesite sve neophodne podatke.'
      return
    }
    this.form.reset()
    this.loginRegisterService.registerUser(username, password).subscribe(
      () => {
        this.showSnackBarMessage("Registration successful", 'success');
        this.router.navigate(['login']);
      },
      error => {
        this.showSnackBarMessage(error.error.message, 'error');
      }
    )
  }
}



