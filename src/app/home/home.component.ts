import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { TestimonialService } from '../Services/testimonial.service';
import { AuthorService } from '../Services/author.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public home: HomeService,
    public testimonialServ: TestimonialService,
    public auther: AuthorService
  ) {}
  ngOnInit() {
    // Check if a script has loaded or a style has applied
    const styleLoaded = Array.from(document.styleSheets).some(
      (sheet) => sheet.href && sheet.href.includes('bootstrap.min.css')
    );
    console.log('Bootstrap CSS loaded:', styleLoaded);
    this.home.getHomePageContant();
    this.testimonialServ.getAcceptedTestimonials();
    this.auther.getAllAuthors();
    $(document).ready(function () {
      let body = <HTMLDivElement>document.body;
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = '../../assets/Home/js/main.js';
      script.async = true;
      script.defer = true;
      body.appendChild(script);
    });
  }
}
