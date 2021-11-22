import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import { MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})



export class DeleteDialogComponent {
  // @ts-ignore
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {
  }
  public workPlaceForm: FormGroup;
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.dialogRef.close(true);
  }
}
