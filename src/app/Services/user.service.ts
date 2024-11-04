import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, private shared: SharedService) { }

  user: any = [];
  
  getUserbyId(id:any) {

    this.http.get(`${this.shared.getSharedUrl()}User/${id}`).subscribe(result => {
      this.user = result;
      console.log(this.user);
    
    }, err => {
      console.log('Something went wrong!!')


    })
  }


  updateUser(body:any){
    const requestBody = {
      user: {
          userid : body.userid,
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          phonenumber: body.phonenumber,
          address: body.address
      }
      
  };

    debugger;
  // body.imagename= this.display_Image;
    this.http.put(`${this.shared.getSharedUrl()}User/update`,body).subscribe((resp)=>{
      console.log('User is Updated');
    },err=>{
      console.log(err);
    })
  
  }
  
 
  
  uploadImage(userId: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('profileImage', file); 

    return this.http.put(`${this.shared.getSharedUrl()}User/upload-image/${userId}`, formData); // إضافة المعرّف إلى الرابط
  }

  /// Favorite Book
//https://localhost:7173/api/FavoriteBook/user-favorites/22
//https://localhost:7173/api/FavoriteBook/add-to-favorites?bookId=5&userId=22
//https://localhost:7173/api/FavoriteBook/remove-from-favorites?favoriteBookId=2&userId=22
userFavoriteBook: any[] = [];
private favoriteBooksSubject = new BehaviorSubject<any[]>(this.userFavoriteBook);
favoriteBooks$ = this.favoriteBooksSubject.asObservable();


getUserFavoriteBook(id: any): void {
  this.http.get(`${this.shared.getSharedUrl()}FavoriteBook/user-favorites/${id}`).subscribe(result => {
    this.userFavoriteBook = result as any;
    this.favoriteBooksSubject.next(this.userFavoriteBook);
    console.log(this.userFavoriteBook);
  }, err => {
    console.log('Something went wrong!!');
  });
}

addBookToFavorites(bookid: any, id: any): void {
  this.http.post(`${this.shared.getSharedUrl()}FavoriteBook/add-to-favorites?bookId=${bookid}&userId=${id}`, {}).subscribe(
    (resp) => {
      console.log('Book added to favorites:', resp);
      // إعادة تحميل المفضلات بعد إضافة الكتاب
      this.getUserFavoriteBook(id);
    },
    (err) => {
      console.error(err);
    }
  );
}
removeBookFromFavorites(favoriteBookId: any, id: any): void {
  this.http.delete(`${this.shared.getSharedUrl()}FavoriteBook/remove-from-favorites?favoriteBookId=${favoriteBookId}&userId=${id}`).subscribe(
    (resp) => {
        console.log("remove done");
    },
    (err) => {
        console.error(err);
    }
);
}


}
