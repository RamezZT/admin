import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-favorite-books',
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.css']
})
export class FavoriteBooksComponent implements OnInit {

  id: any | null;

  constructor(public userServ: UserService) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('userid');
    this.userServ.getUserFavoriteBook(this.id);
  }

  removeFromFavorites(favoriteBookId: any): void {
    if (this.id) {
      this.userServ.removeBookFromFavorites(favoriteBookId, this.id);
      console.log(`fav book id : ${favoriteBookId} + user id ${this.id}`)
      this.userServ.userFavoriteBook = this.userServ.userFavoriteBook.filter((book: any) => book.favoritebookid !== favoriteBookId);
    }
  }
}
