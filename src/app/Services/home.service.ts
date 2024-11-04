import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http:HttpClient) { }
  //https://localhost:7173/api/HomePage/GetAllHome

  HomePage:any=[]; 

  getHomePageContant(){
    this.http.get("https://localhost:7173/api/HomePage/GetAllHome").subscribe(result=>
      {this.HomePage =result ; console.log(this.HomePage[0])},err=>
        {console.log(err.message);})
  }
}
