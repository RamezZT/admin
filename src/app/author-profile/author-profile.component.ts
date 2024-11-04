import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../Services/author.service';
declare var $:any;

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent implements OnInit {

  id:any;
  // numOfBook : number | undefined;
  constructor(private router:ActivatedRoute,public authorserv:AuthorService, private cdr: ChangeDetectorRef){
    {
      this.id = this.router.snapshot.paramMap.get("id")
      console.log(this.id);
    }
  }
  ngOnInit(): void {
this.authorserv.getAuthorById(this.id);
setTimeout(() => {
  if (this.authorserv.Author.books) {
    console.log(this.authorserv.Author.books);

    console.log(this.authorserv.Author.books.length);
    // this.numOfBook = this.authorserv.Author.books.length;
    // console.log(this.numOfBook)
  } else {
    console.log('No books');
  }
  this.cdr.detectChanges();
}, 1000);
    $(document).ready(function(){
      let body = <HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.innerHTML='';
      script.src = '../../assets/Home/js/main.js';
      script.async=true;
      script.defer=true;
      body.appendChild(script);
    });

}}
