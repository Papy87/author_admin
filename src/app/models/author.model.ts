
import {BookModel} from './book.model'

export interface AuthorModel {
  firstName: string;
  lastName: string;
  id: number;
  userId: number;
  email:string;
  books: BookModel [];
}
