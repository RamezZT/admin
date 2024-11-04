import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(public http: HttpClient, private shared: SharedService) { }

  UserBorrowHistory:any=[]; 
  UserCreaditCard: any = [];
  //https://localhost:7173/api/CreditCard/GetCreditByUserId/2


  getCreaditCardByUserID() {
    return this.http.get(this.shared.getSharedUrl() + "CreditCard/GetCreditByUserId/" + 1);
  }


//   UpdateCreaditCard(body:any){
//   /**{
//   "id": 1,
//   "holdername": "Ahmad",
//   "creditnumber": 1234567812345678,
//   "expirydate": "2026-10-20T18:13:10",
//   "cvv": 123,
//   "balance": 30000,
//   "userid": 2

// } */

//     this.http.put(`${this.shared.getSharedUrl()}CreditCard/UpdateCredit`,body).subscribe((resp)=>{
//       console.log('card is Updated');
//     },err=>{
//       console.log(err);
//     })
  
//   }

  

//   createBorrowBook(body: any) {
//     /**{
//   "borrowingdate": "2024-10-28T15:27:17.868Z",
//   "duedate": "2024-10-31T15:27:17.868Z",
//   "amount": 20,
//   "createdat": "2024-10-30T15:27:17.868Z",
//   "bookid": 2,
//   "userid": 2,
//   "libraryid": 1
 
// } */

//     this.http.post(this.shared.getSharedUrl() + 'BorrowedBook/NewBorrow', body).subscribe(
//       (resp) => {
//         console.log('Book borrow Sacssfily');

//       },
//       (err) => {
//         console.error('book borrow failed');
//       }
//     );



//   }

UpdateCreaditCard(body: any) {
  return this.http.put(`${this.shared.getSharedUrl()}CreditCard/UpdateCredit`, body);
}

createBorrowBook(body: any) {
  return this.http.post(this.shared.getSharedUrl() + 'BorrowedBook/NewBorrow', body);
}
//https://localhost:7173/api/BorrowedBook/HistoryOfBorrowing/22
HistoryOfBorrowing(userid:any){
  this.http.get(this.shared.getSharedUrl()+"BorrowedBook/HistoryOfBorrowing/"+userid).subscribe(result=>
    {this.UserBorrowHistory =result ;console.log(this.UserBorrowHistory) },err=>
      {console.log(err.message);})

}

//https://localhost:7173/api/PaidFees/PayFee
payFees(body : any){
return this.http.post(this.shared.getSharedUrl() + 'PaidFees/PayFee', body);
}


}