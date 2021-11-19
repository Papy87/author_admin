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

  constructor(private loginRegisterService: LoginRegisterService, private router: Router, private snackbar: MatSnackBar, private renderer: Renderer2) {
    renderer.setStyle(document.body, 'background', `url(https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2020/02/25145253/Photo-by-Alfons-Morales-on-Unsplash-scaled-1535x900.jpg) no-repeat center fixed`)
    renderer.setStyle(document.body, 'background-size', `cover`);
    renderer.setStyle(document.body, 'background-repeat', `no-repeat`);
  }

  ngOnInit(): void {
    this.initForm()
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
    this.loginRegisterService.loginUser(username, password).subscribe(
      data => {
        console.log(data)
        this.renderer.removeStyle(document.body, "background-image");
        this.showSnackBarMessage(data.message,'success');
        this.router.navigate(['author'])
      },
      error => {
        this.showSnackBarMessage(error.error.message, 'error');
      }
    )
  }
}
