import {NgModule, Renderer2} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { AuthorComponent } from './components/author/author.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AuthInterceptor} from "./services/auth.interceptor";
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import { AuthorBooksComponent } from './components/author-books/author-books.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { BookAddDialogComponent } from './components/book-add-dialog/book-add-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { BookEditDialogComponent } from './components/book-edit-dialog/book-edit-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';






@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AuthorComponent,
    AuthorBooksComponent,
    NavbarComponent,
    AuthorListComponent,
    BookAddDialogComponent,
    BookEditDialogComponent,
    DeleteDialogComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
