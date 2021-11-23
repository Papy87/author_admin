
import {BookModel} from './book.model'

export interface AuthorModel {
  fullName: string;
  id: number;
  userId: number;
  email:string;
  books: BookModel [];
}
