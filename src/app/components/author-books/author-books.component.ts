import {Component, OnInit} from '@angular/core';
import jwt_decode from "jwt-decode";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {BookAddDialogComponent} from "../book-add-dialog/book-add-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BookEditDialogComponent} from "../book-edit-dialog/book-edit-dialog.component";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css']
})
export class AuthorBooksComponent implements OnInit {
  searchForm: FormGroup;
  search: string = '';
  token: any;
  bookData: any[];
  booksCount: number;
  authorId: number;
  length: number;
  pageSize: number = 10;
  pageSizeOptions: number[] = [1, 5, 10];
  maxall: number = 15;
  pageNumber: number = 0;
  public bookForm: FormGroup;
  myBooks: boolean = true;
  tokenAuthor: number;
  showDiv: boolean
  authorFullName: string = "John";
  authorEmail: string = "john@gmial.com";

  constructor(public dialog: MatDialog, private bookService: BookService, private authorService: AuthorService, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(() => {
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup(
      {
        title: new FormControl(null),
        genre: new FormControl(null),
        description: new FormControl(null)
      }
    );
    this.searchForm = new FormGroup(
      {
        title: new FormControl(null)
      }
    )
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    this.getToken(this.authorId);
    this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber, this.search);
    this.getAuthorInfo(this.authorId);
    this.lookup()
  }

  getToken(id: number) {
    // @ts-ignore
    this.token = jwt_decode(localStorage.getItem("token"));
    this.tokenAuthor = this.token.authorId;
    this.myBooks = id === this.tokenAuthor;
  }

  getAurhorBooks(id: number, pageSize: number, pageNumber: number, title: string) {
    this.bookService.getAurhorBooks(id, pageSize, pageNumber, title).subscribe(
      data => {
        this.booksCount = data.data.count;
        this.showDiv = !!this.booksCount;
        this.length = data.data.count;
        this.bookData = data.data.rows;
      }, error => {
        console.log(error)
      }
    )
  }

  getAuthorInfo(id: number) {
    this.authorService.getAuthorInfo(id).subscribe(
      result => {
        let {data} = result;
        this.authorFullName = data.fullName;
        this.authorEmail = data.email;
      }
    )
  }


  private showSnackBarMessage(message: string, type?: string) {
    const config = {duration: 2500};
    if (type) {
      config['panelClass'] = type;
    }
    this.snackbar.open(message, '', config);
  }

  getPageSizeOptions(): number[] {
    if (this.length > this.maxall) {
      return [1, 5, 10, this.length];
    } else {
      return [1, 5, 10, this.maxall];
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
    this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber, this.search)
  }


  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(BookAddDialogComponent, {
      minWidth: '40vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.addBook(result).subscribe(
          () => {
            this.showSnackBarMessage("Book add successful", 'snackbar-success');
            this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber, this.search);
          },
          () => this.showSnackBarMessage("Book add failed", 'snackbar-error')
        )
      } else {
      }
    })

  }

  openEditBookDialog(data: any): void {
    let {id} = data;
    const dialogRef = this.dialog.open(BookEditDialogComponent, {
      minWidth: '40vw',
      data: {data}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let {title, genre, description} = result;
        let data = {
          title, genre, description
        }
        this.bookService.editBook(id, data).subscribe(
          () => {

            this.showSnackBarMessage("Book update successful", 'snackbar-success');
            this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber, this.search);
          },
          () => this.showSnackBarMessage("Book update  failed", 'snackbar-error')
        )
      } else {
      }
    })
  }

  openDeleteBookDialog(data: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      minWidth: '40vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let {id} = data;
        this.bookService.delteBook(id).subscribe(
          () => {
            this.showSnackBarMessage("Book delete successful", 'snackbar-success');
            this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber, this.search);
          },
          () => {
            this.showSnackBarMessage("Book delete  failed", 'snackbar-error');

          }
        )
      } else {
      }
    })
  }

  bookSearch(event: any) {
    this.search = event;
    this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber, this.search);
  }


}

