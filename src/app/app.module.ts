import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { BooksComponent } from './books/books.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GetAboutUsComponent } from './aboutus/crud/get-about-us/get-about-us.component';
import { EditAboutUsComponent } from './aboutus/crud/edit-about-us/edit-about-us.component';
import { RouterModule } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { AddBookComponent } from './books/crud/add-book/add-book.component';
import { EditBookComponent } from './books/crud/edit-book/edit-book.component';
import { UpdateBookComponent } from './books/crud/update-book/update-book.component';
import { DeleteBookComponent } from './books/crud/delete-book/delete-book.component';
import { AllBooksComponent } from './books/crud/all-books/all-books.component';
import { LibraryComponent } from './library/library.component';
import { AddLibraryComponent } from './library/crud/add-library/add-library.component';
import { EditLibraryComponent } from './library/crud/edit-library/edit-library.component';
import { AllLibrariesComponent } from './library/crud/all-libraries/all-libraries.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/crud/add-category/add-category.component';
import { AllCategoriesComponent } from './category/crud/all-categories/all-categories.component';
import { EditCategoryComponent } from './category/crud/edit-category/edit-category.component';
import { EditLibraryCategoriesComponent } from './library/crud/edit-library-categories/edit-library-categories.component';
import { AuthorComponent } from './author/author.component';
import { AddAuthorComponent } from './author/crud/add-author/add-author.component';
import { EditAuthorComponent } from './author/crud/edit-author/edit-author.component';
import { AllAuthorsComponent } from './author/crud/all-authors/all-authors.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { AllBorrowedBooksComponent } from './borrowed-books/crud/all-borrowed-books/all-borrowed-books.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OfferComponent } from './offer/offer.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { UsersComponent } from './users/users.component';
import { GetContactUsComponent } from './contact-us/crud/get-contact-us/get-contact-us.component';
import { EditContactUsComponent } from './contact-us/crud/edit-contact-us/edit-contact-us.component';
import { GetHomePageComponent } from './home-page/crud/get-home-page/get-home-page.component';
import { EditHomePageComponent } from './home-page/crud/edit-home-page/edit-home-page.component';
import { UserComponent } from './user/user.component';
import { GetAllUsersComponent } from './user/crud/get-all-users/get-all-users.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GetAllFeedbackComponent } from './feedback/crud/all-feedbacks/all-feedbacks.component';
import { FeedbackInfoComponent } from './feedback/crud/feedback-info/feedback-info.component';
import { AllTestimonialComponent } from './testimonial/crud/all-testimonial/all-testimonial.component';
import { AuthInterceptor } from './auth.interceptor';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { AllOffersComponent } from './offer/crud/all-offers/all-offers.component';
import { AddOfferComponent } from './offer/crud/add-offer/add-offer.component';
import { EditOfferComponent } from './offer/crud/edit-offer/edit-offer.component';
import { ReportComponent } from './report/report.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    GetAboutUsComponent,
    EditAboutUsComponent,
    AddBookComponent,
    EditBookComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    AllBooksComponent,
    LibraryComponent,
    AddLibraryComponent,
    EditLibraryComponent,
    AllLibrariesComponent,
    CategoryComponent,
    AddCategoryComponent,
    AllCategoriesComponent,
    EditCategoryComponent,
    EditLibraryCategoriesComponent,
    AuthorComponent,
    AddAuthorComponent,
    EditAuthorComponent,
    AllAuthorsComponent,
    BorrowedBooksComponent,
    AllBorrowedBooksComponent,
    ContactUsComponent,
    HomePageComponent,
    OfferComponent,
    TestimonialComponent,
    UsersComponent,
    GetContactUsComponent,
    EditContactUsComponent,
    GetHomePageComponent,
    EditHomePageComponent,
    UserComponent,
    GetAllUsersComponent,
    FeedbackComponent,
    GetAllFeedbackComponent,
    FeedbackInfoComponent,
    AllTestimonialComponent,
    AllOffersComponent,
    AddOfferComponent,
    EditOfferComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AboutusComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AngularQueryDevtools,
    ReactiveFormsModule,
  ],
  exports: [CommonModule, FormsModule], // Export CommonModule for global use
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },

    provideAngularQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 100000000,
            retry: 0,
          },
          mutations: {
            retry: 0,
          },
        },
      })
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
