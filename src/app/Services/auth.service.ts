import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public http: HttpClient,
    private shared: SharedService,
    private router: Router
  ) {}

  RegisterUser(body: any) {
    const requestBody = {
      UserData: {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        phonenumber: body.phonenumber,
        address: body.address,
      },
      LoginData: {
        username: body.username,
        password: body.password,
      },
    };

    this.http
      .post(this.shared.getSharedUrl() + 'User/register', requestBody)
      .subscribe(
        (resp) => {
          console.log('the user registered');
          this.router.navigate(['/security/login']);
        },
        (err) => {
          console.error('Registration failed');
        }
      );
  }

  Login(username: any, password: any) {
    var body = {
      username: username.value.toString(),
      password: password.value.toString(),
    };

    this.http
      .post(this.shared.getSharedUrl() + 'Login/sign-in', body)
      .subscribe(
        (resp: any) => {
          console.log(resp);

          localStorage.setItem('username', resp.username);
          localStorage.setItem('userid', resp.userid);
          localStorage.setItem('roleid', resp.roleid.toString());
          localStorage.setItem('token', resp.token);

          if (resp.roleid === 1) {
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          } else if (resp.roleid === 2) {
            this.router.navigate(['/admin']);
          }
        },
        (err) => {
          console.log('username or password incorrect');
          console.log(err);
        }
      );
  }
}
