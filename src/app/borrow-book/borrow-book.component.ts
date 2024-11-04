import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../Services/book.service';
import { BorrowService } from '../Services/borrow.service';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {
  bookId: any;
  book: any;
  borrowDate: string = '';
  returnDate: string = '';
  totalPrice: number = 0;
  userCardBalance: number = 0; 

  constructor(
    private router2: Router,
    private route: ActivatedRoute,
    private bookserv: BookService,
    private borrowService: BorrowService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');

    if (this.bookId) {
     
      this.bookserv.getBookById(this.bookId);
    } else {
      console.error('Book ID not found in route parameters.');
    }
  }

  calculateTotalPrice() {
    const startDate = new Date(this.borrowDate);
    const endDate = new Date(this.returnDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    console.log(startDate + "         "+ endDate + "             " + timeDiff + "     " + daysDiff)
    if (daysDiff > 0) {
      this.totalPrice = daysDiff * this.bookserv.book.priceperday;
    } else {
      this.totalPrice = 0;
    }
  }

  submitBorrow() {
   

this.calculateTotalPrice();
 const userId = localStorage.getItem('userid')

  
    this.borrowService.getCreaditCardByUserID().subscribe((card: any) => {
      this.userCardBalance = card.balance; 

      if (this.userCardBalance >= this.totalPrice) {
     
        this.userCardBalance -= this.totalPrice;

      
        card.balance = this.userCardBalance;
    
          const borrowData = {
            borrowingdate: this.borrowDate,
            duedate: this.returnDate,
            amount: this.totalPrice,
            status :'Not Returned',
            bookid: this.bookId,
            userid: userId,
            libraryid: this.bookserv.book.libraryid
          };
          console.log(card.balance)
          console.log(borrowData)
          this.borrowService.createBorrowBook(borrowData).subscribe(() => {
            alert('Book borrowed successfully!');

            this.router2.navigate(['/bookDetails', this.bookId]);
          }, error => {
            console.error('Error borrowing book:', error);
          });
       

      } else {
        alert('Insufficient balance!');
      }
    }, error => {
      console.error('Error fetching credit card:', error);
    });
  }
}