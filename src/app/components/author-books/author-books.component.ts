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
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthorService} from "../../services/author.service";

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
  showDiv: boolean
  authorFirstName:string="John";
  authorLastName:string="Do";
  authorEmail:string="john@gmial.com";

  constructor(public dialog: MatDialog, private bookService: BookService,private authorService: AuthorService, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
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
    this.getAuthorInfo(this.authorId);
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
        result=>{
          let {data}=result;
          this.authorFirstName=data.firstName;
          this.authorLastName=data.lastName;
          this.authorEmail=data.email;
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
            this.showSnackBarMessage("Book add successful", 'success');
            this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber);
          },
          error => this.showSnackBarMessage("Book add  failed", 'error')
        )
      } else {
      }
    })

  }

  openEditBookDialog(data: any): void {
    let {id} = data;
    const dialogRef = this.dialog.open(BookEditDialogComponent, {
      minWidth: '50vw',
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

            this.showSnackBarMessage("Book update successful", 'success');
            this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber);
          },
          () => this.showSnackBarMessage("Book update  failed", 'error')
        )
      } else {
      }
    })
  }

  openDeleteBookDialog(data: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      minWidth: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let {id} = data;
        this.bookService.delteBook(id).subscribe(
          () => {
            this.showSnackBarMessage("Book delete successful", 'success');
            this.getAurhorBooks(this.authorId, this.pageSize, this.pageNumber);
          },
          () => {
            this.showSnackBarMessage("Book delete  failed", 'error');

          }
        )
      } else {
      }
    })
  }


}

