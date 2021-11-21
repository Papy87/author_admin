import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import jwtDecode from "jwt-decode";

class DialogData {
  data: object;
}

@Component({
  selector: 'app-book-edit-dialog',
  templateUrl: './book-edit-dialog.component.html',
  styleUrls: ['./book-edit-dialog.component.css']
})
export class BookEditDialogComponent implements OnInit {

  public bookEditForm: FormGroup;
  book: object;

  constructor(public dialogRef: MatDialogRef<BookEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.book = this.data.data;
    this.initForm(this.book);
  }


  private initForm(book: object) {
    this.bookEditForm = new FormGroup({
      // @ts-ignore
      title: new FormControl(book.title, Validators.required),
      // @ts-ignore
      genre: new FormControl(book.genre, Validators.required),
      // @ts-ignore
      description: new FormControl(book.description, Validators.required),
    })

  }

  onSubmit() {
    const title = this.bookEditForm.value['title'];
    const genre = this.bookEditForm.value['genre'];
    const description = this.bookEditForm.value['description'];
    const token = jwtDecode(localStorage.getItem('token'));
    // @ts-ignore
    const authorId = token.authorId;
    this.book = {
      title, genre, description,authorId
    };
    this.dialogRef.close(this.book);
  }

}
