import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(public http:HttpClient,private shared:SharedService) {}
  AboutUs:any=[]; 


  getAboutUs(){
    this.http.get(this.shared.getSharedUrl()+"AboutUs").subscribe(result=>
      {this.AboutUs =result ;console.log(this.AboutUs) },err=>
        {console.log(err.message);})
  }
  


}
