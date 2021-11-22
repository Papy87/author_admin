import {Component, OnInit} from '@angular/core';
import jwt_decode from "jwt-decode";
import {LoginRegisterService} from "../../services/login-register.service";
import {AuthorService} from "../../services/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorModel} from "../../models/author.model";
import {PageEvent} from "@angular/material/paginator";
import {BookEditDialogComponent} from "../book-edit-dialog/book-edit-dialog.component";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AutorAddDialogComponent} from "../autor-add-dialog/autor-add-dialog.component";
import {AutorEditDialogComponent} from "../autor-edit-dialog/autor-edit-dialog.component";

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  constructor(private loginRegisterService: LoginRegisterService, private snackbar: MatSnackBar, private authorsService: AuthorService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,) {
  }

  token: object;
  authorsData: AuthorModel[];
  authorsCount: number;
  length: number;
  pageSize: number = 10;
  pageSizeOptions: number[] = [1, 5, 10, 20, 25];
  maxall: number = 50;
  pageNumber: number = 0;
  isAdmin: boolean;


  ngOnInit(): void {
    this.getToken();
    this.lookup();
  }


  getToken() {
    // @ts-ignore
    this.token = jwt_decode(localStorage.getItem("token"));
    // @ts-ignore
    this.isAdmin = this.token.isAdmin;
  }

  onLogout() {
    this.loginRegisterService.logout()
  }

  getAuthors() {
    this.authorsService.getAllAutors(this.pageNumber, this.pageSize).subscribe(data => {
        this.length = data.data.count;
        this.authorsData = data.data.rows;
      },
      error => {
        console.log(error)
      })
  }

  authorBooks(id: number) {
    this.router.navigate(['author/', id, 'books'])
  }

  getPageSizeOptions(): number[] {
    if (this.length > this.maxall) {
      return [1, 5, 10, 20, 25, this.length];
    } else {
      return [1, 5, 10, 20, 25, this.maxall];
    }
  }


  lookup(event?: PageEvent) {
    if (event) {
      this.pageNumber = event.pageIndex;
      this.pageSize = event.pageSize;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams:
        {
          page: this.pageNumber,
          pageSize: this.pageSize,

        },
      replaceUrl: true,

    });
    this.getAuthors()
  }

  private showSnackBarMessage(message: string, type?: string) {
    const config = {duration: 2500};
    if (type) {
      config['panelClass'] = type;
    }
    this.snackbar.open(message, '', config);
  }

  openAddAuthorDialog(): void {

    const dialogRef = this.dialog.open(AutorAddDialogComponent, {
      minWidth: '50vw',
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.authorsService.addAuthor(result).subscribe(
          () => {
            this.showSnackBarMessage("Author add successful", 'success');
            this.getAuthors();
          },
          () => this.showSnackBarMessage("Author add failed", 'error')
        )
      } else {
      }
    })
  }

  openEditAuthorDialog(data: any): void {
    let {id} = data;
    const dialogRef = this.dialog.open(AutorEditDialogComponent, {
      minWidth: '50vw',
      data: {data}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authorsService.editAuthor(id, result).subscribe(
          () => {
            this.showSnackBarMessage("Author update successful", 'success');
            this.getAuthors();
          },
          () => this.showSnackBarMessage("Author update  failed", 'error')
        )
      } else {
      }
    })
  }

  openDeleteAuthorDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      minWidth: '50vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authorsService.deleteAuthor(id).subscribe(
          () => {
            this.showSnackBarMessage("Author delete successful", 'success');
            this.getAuthors();
          },
          () => {
            this.showSnackBarMessage("Author delete  failed", 'error');

          }
        )
      } else {
      }
    })
  }
}
