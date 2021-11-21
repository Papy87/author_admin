import {Component, OnInit, Renderer2} from '@angular/core';
import {LoginRegisterService} from "../../services/login-register.service";
import jwt_decode from 'jwt-decode';
import {AuthorService} from "../../services/author.service";
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {AuthorModel} from "../../models/author.model";
import {BookModel} from "../../models/book.model";
import {Router} from "@angular/router";




interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  constructor() {

  }

  ngOnInit(): void {
  }

}
