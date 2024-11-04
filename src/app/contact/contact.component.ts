import { Component, OnInit } from '@angular/core';
import { ContactService } from '../Services/contact.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
   constructor(public cotnact:ContactService){}
    
   ngOnInit(): void {
     this.cotnact.getContactUs();
   }

   addFeedback:FormGroup = new FormGroup({
    sendername:new FormControl('',[Validators.required]), 
    email:new FormControl('',[Validators.required,Validators.email]), 
    title:new FormControl('',[Validators.required]), 
    message:new FormControl('',[Validators.required])
  })

  sendFeedback(){
    debugger
   this.cotnact.addFeedbackForm(this.addFeedback.value)
  console.log(this.addFeedback.value);
  }
}
