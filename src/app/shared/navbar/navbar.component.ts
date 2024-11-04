import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router,public User:UserService) {}

  username: string | null = '';
  id: any | null = '';

    ngOnInit() {
        this.username = localStorage.getItem('username');
        this.id = localStorage.getItem('userid');
        if(this.id != null)
        this.User.getUserbyId(this.id);
        
    }

    isUserLoggedIn(): boolean {
        return this.username !== null; 
    }

  goToLogin() {
      this.router.navigate(['/security/login']);
  }

  Logout(){
    this.closeOffcanvas();
    this.router.navigate(['/security/login']).then(() => {
      // إعادة تحميل الصفحة
      window.location.reload();
  });
    localStorage.clear();
  }

  closeOffcanvas() {
    const offcanvasElement = document.querySelector('.offcanvas__info');
    if (offcanvasElement) {
        offcanvasElement.classList.remove('info-open');
    }
}
 
}
