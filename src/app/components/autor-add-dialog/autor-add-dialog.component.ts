import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-autor-add-dialog',
  templateUrl: './autor-add-dialog.component.html',
  styleUrls: ['./autor-add-dialog.component.css']
})
export class AutorAddDialogComponent implements OnInit {
  authorForm: FormGroup
  aurhor: object

  constructor(public dialogRef: MatDialogRef<AutorAddDialogComponent>) {
  }

  ngOnInit(): void {
    this.initForm()

  }

  private initForm() {
    this.authorForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }


  onSubmit() {
    const fullName = this.authorForm.value['fullName'];
    const username = this.authorForm.value['username'];
    const email = this.authorForm.value['email'];
    const password = this.authorForm.value['password'];
    this.aurhor = {
     fullName,username,email,password
    };
    this.dialogRef.close(this.aurhor);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
