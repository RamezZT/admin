import { Component, Input } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
@Input() Books_Obj:any;
userId: any;
isFavorite: boolean = false;

constructor(private userServ: UserService) {
  this.userId = localStorage.getItem('userid'); 
}

ngOnInit(): void {
  if (this.userId) {
    this.userServ.getUserFavoriteBook(this.userId);
    this.userServ.favoriteBooks$.subscribe(favorites => {
      // تحقق من وجود الكتاب في المفضلات
      this.isFavorite = favorites.some((book: any) => book.book.bookid === this.Books_Obj.bookid);
    });
  }
}

addToFavorites(bookId: any): void {
  if (this.userId) {
    
    if (!this.isFavorite) {
      this.userServ.addBookToFavorites(bookId, this.userId);
      this.isFavorite = true; 
    } else {
      console.log('Book is already in favorites');
    }
  } else {
    console.log('User not logged in');
  }
}

}

