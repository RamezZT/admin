import { Component, OnInit } from '@angular/core';
import { BookService } from '../Services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit {
userid:any;
  id:any;
  numberOfRatings:number=0;
  totalRating:number=0;

constructor(public bookserv:BookService, private router:ActivatedRoute,private router2: Router){
  this.id = this.router.snapshot.paramMap.get("id")
  console.log(this.id);
}

ngOnInit(): void {
  this.userid = localStorage.getItem("userid");
  this.bookserv.getBookById(this.id);
  this.bookserv.getBookRating(this.id);
 
      $(document).ready(function(){
      let body = <HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.innerHTML='';
      script.src = '../../assets/Home/js/main.js';
      script.async=true;
      script.defer=true;
      body.appendChild(script);
    });
}

compatichon(){

}

borrowBook() {

  this.router2.navigate(['/BorrowBook', this.id]);
}
review = {
  rating: 0,
  comments: '',
};
tempRating: number | null = null;
setRating(rating: number) {
  this.review.rating = rating;
}

submitReview() {
  const userid = this.userid;
  const bookid = this.id;
  const ratingValue = Number(this.review.rating);

  const newAvg = (this.bookserv.bookrating.total_rating + ratingValue) / (this.bookserv.bookrating.number_of_ratings + 1);


  const reviewData = {
    reviewData: {
      rating: ''+this.review.rating,
      comments: this.review.comments,
      userid: userid,
      bookid: bookid,
    },
    newAvg: newAvg,
  };

  console.log('Review Data:', reviewData);
   this.bookserv.addReviewOnBook(reviewData);
   setTimeout(() => {
    window.location.reload();
  }, 5000);
}
getRoundedRating(): number {
  return Math.round(this.bookserv.book.avgrating); 
}
}
