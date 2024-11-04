import { Component, OnInit } from '@angular/core';
import { BorrowService } from '../Services/borrow.service';

@Component({
  selector: 'app-borrowing-history',
  templateUrl: './borrowing-history.component.html',
  styleUrls: ['./borrowing-history.component.css']
})
export class BorrowingHistoryComponent implements OnInit {
  
  id: any;
  isDialogOpen: boolean = false;
  selectedBook: any; 
  
  
  
  cardHolderName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  currentBalance: number = 0; 
  constructor(public borrowServ: BorrowService) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('userid');
    if (this.id) {
      this.borrowServ.HistoryOfBorrowing(this.id);
    }
  }

  openPaymentDialog(obj: any) {
    this.isDialogOpen = true;
    this.selectedBook = obj; 
    this.getCreditCard();
  }

  close() {
    this.isDialogOpen = false;
    this.selectedBook = null; 
  }

  getCreditCard() {
    this.borrowServ.getCreaditCardByUserID().subscribe(
      (data: any) => {
        if (data) {
          this.cardHolderName = data.holdername;
          this.cardNumber = data.creditnumber;
          this.expiryDate = data.expirydate;
          this.cvv = data.cvv;
          this.currentBalance = data.balance; 
        }
      },
      error => {
        console.error('Error fetching credit card data:', error);
        alert('فشل في جلب بيانات بطاقة الائتمان. يرجى المحاولة مرة أخرى.');
      }
    );
  }

  onSubmit() {
    const feeAmount = this.calculateFees(this.selectedBook.duedate, this.selectedBook.book.priceperday);
    
    if (this.currentBalance >= feeAmount) {
      const updatedBalance = this.currentBalance - feeAmount;
  
      const creditCardData = {
        id: 1,
        holdername: this.cardHolderName,
        creditnumber: this.cardNumber,
        expirydate: this.expiryDate,
        cvv: this.cvv,
        balance: updatedBalance, 
        userid: 1
      };
  
      this.borrowServ.UpdateCreaditCard(creditCardData).subscribe(
        cardResponse => {
          console.log('Credit card response:', cardResponse);
          
          if (cardResponse ==null) { 

            console.log('Credit card updated successfully:', cardResponse);
            alert('تمت العملية بنجاح. سيتم إعادة تحميل الصفحة الآن.');
            const paymentData = {
              feeamount: feeAmount,
              userEmail: "example@.com", 
              userid: this.selectedBook.userid,
              borrowedbookid: this.selectedBook.id,
              returningdate: new Date(), 
              createdat: new Date(), 
            };
  
            setTimeout(() => {
              this.close();
              location.reload();
            }, 2000);
            this.borrowServ.payFees(paymentData).subscribe(response => {
              console.log('Payment response:', response);
              this.close();
  
              alert('تمت العملية بنجاح. سيتم إعادة تحميل الصفحة الآن.');
              location.reload(); 
            }, error => {
              console.error('Error processing payment:', error);
            });
          }
          
          else {
            console.error('Failed to update credit card:', cardResponse);
          }
        },
        cardError => {
          console.error('Error updating credit card:', cardError);
        }
      );
    } else {
      alert('لا يوجد رصيد كافٍ لتغطية الرسوم.');
    }
  }
  
  
  
  calculateFees(duedate: Date, price: number): number {
    const today = new Date();
    if (today <= new Date(duedate)) {
      return 0;
    } else {
      const diffInTime = today.getTime() - new Date(duedate).getTime();
      const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24)); 

      return diffInDays * 0.2 * price; 
    }
  }}
