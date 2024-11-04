import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/Services/contact.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(public cotnact:ContactService,public home:HomeService){}
    
  ngOnInit(): void {
    this.cotnact.getContactUs();
    this.home.getHomePageContant();
  }
}
