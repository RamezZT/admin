import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(public http:HttpClient,private shared:SharedService) { }

  //https://localhost:7173/api/
  UserTestimonial:any=[]; 


  getAcceptedTestimonials(){
    this.http.get(this.shared.getSharedUrl()+"Testimonial/AcceptedTestimonials").subscribe(result=>
      {this.UserTestimonial =result ;console.log(this.UserTestimonial) },err=>
        {console.log(err.message);})
  }

  //https://localhost:7173/api/Testimonial/AddTestimonial
/*
{
  
  "message": "",
"rate": 4,
  "userid": 23
 
}*/ 
AddTestimonial(body: any) {
   

    this.http.post(this.shared.getSharedUrl() + 'Testimonial/AddTestimonial', body).subscribe(
        (resp) => {
            console.log('Add Testimonial done');
        },
        (err) => {
            console.error('Testimonial failed');
        }
    );
}

}
