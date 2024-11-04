import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
constructor(private user:AuthService){}
  registerForm = new FormGroup({
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),

    email: new FormControl("", [Validators.required,Validators.email]),
    phonenumber: new FormControl("", [Validators.required]),
    
    address: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
    
  });

  Submit() {
    this.user.RegisterUser(this.registerForm.value)
    console.log(this.registerForm.value);
  }
}
