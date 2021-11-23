import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
}

@Component({
  selector: 'app-autor-edit-dialog',
  templateUrl: './autor-edit-dialog.component.html',
  styleUrls: ['./autor-edit-dialog.component.css']
})
export class AutorEditDialogComponent implements OnInit {
  editAuthorForm: FormGroup;
  author:object;
  constructor(public dialogRef: MatDialogRef<AutorEditDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }



  ngOnInit() {
    // @ts-ignore
    this.author = this.data.data;
    this.initForm(this.author);
  }


  private initForm(author: object) {
    this.editAuthorForm = new FormGroup({
      // @ts-ignore
      fullName: new FormControl(author.fullName, Validators.required),
      // @ts-ignore
      email: new FormControl(author.email, Validators.required),
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const fullName = this.editAuthorForm.value['fullName'];
    const email = this.editAuthorForm.value['email'];
    this.author = {
      fullName,email
    };
    this.dialogRef.close(this.author);
  }
}
