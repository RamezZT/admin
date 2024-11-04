import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchByNamePipe } from '../pips/search-by-name.pipe';
import { SearchByBookNamePipe } from '../pips/search-by-book-name.pipe';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchByNamePipe,
    SearchByBookNamePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
    ReactiveFormsModule,
    SearchByNamePipe,
    FormsModule,
    SearchByBookNamePipe
  ]
})
export class SharedModule { }
