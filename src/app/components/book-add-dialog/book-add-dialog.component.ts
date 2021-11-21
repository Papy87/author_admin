import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
}

@Component({
  selector: 'app-book-add-dialog',
  templateUrl: './book-add-dialog.component.html',
  styleUrls: ['./book-add-dialog.component.css']
})


export class BookAddDialogComponent implements OnInit {
  public bookForm: FormGroup;
  book: object;

  constructor(public dialogRef: MatDialogRef<BookAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initForm();
  }


  private initForm() {
    this.bookForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      genre: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })

  }

  onSubmit() {
    const title = this.bookForm.value['title'];
    const genre = this.bookForm.value['genre'];
    const description = this.bookForm.value['description'];
    this.book = {
      title, genre, description
    };
    this.dialogRef.close(this.book);
  }

}

