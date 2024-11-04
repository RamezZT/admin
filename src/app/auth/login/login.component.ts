import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private auth:AuthService){}
  username:FormControl = new FormControl("",[Validators.required]);
  password:FormControl = new FormControl("",[Validators.required]);

  Submit(){
    this.auth.Login(this.username,this.password);
    console.log(this.username.value);
    console.log(this.password.value);
  }
}
