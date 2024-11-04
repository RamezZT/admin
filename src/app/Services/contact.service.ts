import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(public http:HttpClient,private shared:SharedService) {}
  contactUs:any=[]; 


  getContactUs(){
    this.http.get(this.shared.getSharedUrl()+"ContactUs").subscribe(result=>
      {this.contactUs =result ;console.log(this.contactUs) },err=>
        {console.log(err.message);})
  }


  addFeedbackForm(body:any){   
    this.http.post(this.shared.getSharedUrl()+"Feedback/add-feedback",body).subscribe((resp)=>{
      console.log('the Feefback is Added'); 
    },err=>{
      console.log('Error in Feedback Form');
    })
  
    window.location.reload();
  }



}
