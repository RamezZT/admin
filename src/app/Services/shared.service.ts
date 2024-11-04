import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sharedUrl:string = "https://localhost:7173/api/";
  constructor() { }

  getSharedUrl(){
    return this.sharedUrl;
  }
}
