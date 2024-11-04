import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(public http: HttpClient, private shared: SharedService) { }
  Authors: any = [];
  Author: any = [];

  getAllAuthors() {
    this.http.get(this.shared.getSharedUrl() + "Author/authors").subscribe(result => {
      this.Authors = result;
      console.log(this.Authors)
    }
      , err => { console.log(err.message); })
  }
  //https://localhost:7173/api/Author/authors
  //https://localhost:7173/api/Author/1

  
  getAuthorById(id: number) {
    return this.http.get(`${this.shared.getSharedUrl()}Author/${id}`).subscribe(
      result => {
        console.log(result); 
        this.Author = result; 
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

}
