import { Component, OnInit } from '@angular/core';
import { AboutService } from '../Services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(public about:AboutService){}

   ngOnInit(): void {
     this.about.getAboutUs();
   }
  
}
