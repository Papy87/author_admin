import {Component, OnInit} from '@angular/core';
import jwt_decode from "jwt-decode";
import {ResponseModel} from "../../../models/response/response.model";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {BookAddDialogComponent} from "../book-add-dialog/book-add-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BookEditDialogComponent} from "../book-edit-dialog/book-edit-dialog.component";

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css']
})
export class AuthorBooksComponent implements OnInit {
  token: any;
  bookData: any[];
  booksCount: number;
  authorId: number;
  length: number;
  pageSize: number = 10;
  pageSizeOptions: number[] = [1, 5, 10, 20, 25];
  maxall: number = 50;
  pageNumber: number = 0;
  public bookForm: FormGroup;
  myBooks: boolean = true;
  tokenAuthor: number;


  constructor(public dialog: MatDialog, private bookService: BookService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup(
      {
        title: new FormControl(null),
        genre: new FormControl(null),
        description: new FormControl(null)
      }
    );
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    this.getToken(this.authorId);
    this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber);
    this.lookup()
  }

  onSubmite() {
    const title = this.bookForm.value['title'];
    const genre = this.bookForm.value['genre'];
    const description = this.bookForm.value['description'];


  }

  getToken(id: number) {
    // @ts-ignore
    this.token = jwt_decode(localStorage.getItem("token"));
    this.tokenAuthor = this.token.authorId;
    this.myBooks = id === this.tokenAuthor;
  }

  getAurhorBooks(id: number, pageSize: number, pageNumber: number) {
    this.bookService.getAurhorBooks(id, pageSize, pageNumber).subscribe(
      data => {
        this.booksCount = data.data.count;
        this.length = data.data.count;
        this.bookData = data.data.rows;
      }, error => {
        console.log(error)
      }
    )
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
    this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber)
  }


  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(BookAddDialogComponent, {
      minWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.addBook(result).subscribe(
          result => {
            console.log(result)
          },
          error => console.log(error.toString())
        )
      } else {

      }
      // else (this.router.navigate(['korisnici']), this.id = null)
    })

  }

  openEditBookDialog(data: any): void {
    const dialogRef = this.dialog.open(BookEditDialogComponent, {
      minWidth: '50vw',
      data: {data}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let {authorId, title, genre, description} = result;
        let data = {
          title, genre, description
        }
        this.bookService.editBook(authorId, data).subscribe(
          result => {

            console.log(result)
          },
          error => console.log(error.toString())
        )
      } else {

      }
      // else (this.router.navigate(['korisnici']), this.id = null)
    })

  }

}
