import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../Services/book.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  _filterText:string='';
  libraryName: string = '';
  activeCategory: string = ''; 
  libraryId :any ='';
  constructor(private route: ActivatedRoute, public booksService: BookService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.libraryName = params.get('name')!;
      this.libraryId = params.get('id')!; 
      this.getBooks();
      this.booksService.getCategorybyLibraryId(this.libraryId);
     
    });
  }

  reset(){
    this.getBooks();
  }
  selectCategory(categoryName: string) {
    this.activeCategory = categoryName; 
    this.booksService.getBookByCategoryName(categoryName,this.libraryId); 
  }
  

  getBooks() {
    this.booksService.getBooks(this.libraryName);
  }

}
