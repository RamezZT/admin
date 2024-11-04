import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  constructor(public http: HttpClient, private shared: SharedService) {}
  books: any[] = [];
  book:any=[];
  categories:any=[];
  bookrating:any;
  getBooks(libraryName: string) {
    return this.http.get(`${this.shared.getSharedUrl()}Book/Library/${libraryName}`).subscribe(
      (result: any) => {
        console.log(result); 
        this.books = result; 
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  //https://localhost:7173/api/Book/BookById/1


  getBookById(id: number) {
    return this.http.get(`${this.shared.getSharedUrl()}Book/BookById/${id}`).subscribe(
      result => {
        console.log(result); 
        this.book = result; 
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  //https://localhost:7173/api/Category/categories
  // getAllCategory(){
  //   this.http.get(this.shared.getSharedUrl()+"Category/categories").subscribe(result=>
  //     {this.categories =result ;
  //       console.log(this.categories) },err=>
  //       {console.log(err.message);})
  // }
  //localhost:7173/api/Book/FilterByCategory/History
  getBookByCategoryName(name: any, libraryId: string) {
    this.http.get<any[]>(this.shared.getSharedUrl() + "Book/FilterByCategory/" + name).subscribe(result => {
      console.log("Fetched books:", result);
      console.log("Library ID:", libraryId);
      
      result.forEach(book => {
        console.log("Book libraryid:", book.libraryid, "Type:", typeof book.libraryid);
      });
      
      const libraryIdNumber = Number(libraryId);
      this.books = result.filter(book => book.libraryid === libraryIdNumber);
      
      console.log("Filtered books:", this.books);
    }, err => {
      console.log(err.message);
    });  
}

//LibraryCategory/library-categories/1
  getCategorybyLibraryId(libraryId: any) {
    this.http.get(this.shared.getSharedUrl()+"LibraryCategory/library-categories/"+libraryId).subscribe(result=>
          {this.categories =result ;
            console.log(this.categories) },err=>
            {console.log(err.message);})
      }
//https://localhost:7173/api/BookReview/AddReview
  addReviewOnBook(body:any){   

    /**{
  "reviewData": {
    "rating": "5",
    "comments": "teeeeeest",
    "userid": 21,
    "bookid": 5
  },
  "newAvg": 4.66666667
} */
    this.http.post(this.shared.getSharedUrl()+"BookReview/AddReview",body).subscribe((resp)=>{
      console.log('the review is Added'); 
    },err=>{
      console.log('Error in review Form');
    })
  
  }

  //https://localhost:7173/api/BookReview/book-ratings-data/5
  getBookRating(bookid: any) {
    this.http.get(this.shared.getSharedUrl()+"BookReview/book-ratings-data/"+bookid).subscribe(result=>
          {this.bookrating =result ;
            console.log(this.bookrating) },err=>
            {console.log(err.message);})
      }

}


