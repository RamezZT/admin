import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { LayoutComponent } from './layout/layout.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { EditAboutUsComponent } from './aboutus/crud/edit-about-us/edit-about-us.component';
import { GetAboutUsComponent } from './aboutus/crud/get-about-us/get-about-us.component';
import { AllBooksComponent } from './books/crud/all-books/all-books.component';
import { AddBookComponent } from './books/crud/add-book/add-book.component';
import { EditBookComponent } from './books/crud/edit-book/edit-book.component';
import { LibraryComponent } from './library/library.component';
import { AllLibrariesComponent } from './library/crud/all-libraries/all-libraries.component';
import { AddLibraryComponent } from './library/crud/add-library/add-library.component';
import { EditLibraryComponent } from './library/crud/edit-library/edit-library.component';
import { CategoryComponent } from './category/category.component';
import { AllCategoriesComponent } from './category/crud/all-categories/all-categories.component';
import { AddCategoryComponent } from './category/crud/add-category/add-category.component';
import { EditCategoryComponent } from './category/crud/edit-category/edit-category.component';
import { EditLibraryCategoriesComponent } from './library/crud/edit-library-categories/edit-library-categories.component';
import { AuthorComponent } from './author/author.component';
import { AllAuthorsComponent } from './author/crud/all-authors/all-authors.component';
import { AddAuthorComponent } from './author/crud/add-author/add-author.component';
import { EditAuthorComponent } from './author/crud/edit-author/edit-author.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { AllBorrowedBooksComponent } from './borrowed-books/crud/all-borrowed-books/all-borrowed-books.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GetContactUsComponent } from './contact-us/crud/get-contact-us/get-contact-us.component';
import { EditContactUsComponent } from './contact-us/crud/edit-contact-us/edit-contact-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GetHomePageComponent } from './home-page/crud/get-home-page/get-home-page.component';
import { EditHomePageComponent } from './home-page/crud/edit-home-page/edit-home-page.component';
import { UsersComponent } from './users/users.component';
import { GetAllUsersComponent } from './user/crud/get-all-users/get-all-users.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GetAllFeedbackComponent } from './feedback/crud/all-feedbacks/all-feedbacks.component';
import { FeedbackInfoComponent } from './feedback/crud/feedback-info/feedback-info.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AllTestimonialComponent } from './testimonial/crud/all-testimonial/all-testimonial.component';
import { OfferComponent } from './offer/offer.component';
import { AllOffersComponent } from './offer/crud/all-offers/all-offers.component';
import { AddOfferComponent } from './offer/crud/add-offer/add-offer.component';
import { EditOfferComponent } from './offer/crud/edit-offer/edit-offer.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'aboutus',
        component: AboutusComponent,
        children: [
          { path: '', component: GetAboutUsComponent },
          { path: 'edit', component: EditAboutUsComponent },
        ],
      },
      {
        path: 'contactus',
        component: ContactUsComponent,
        children: [
          { path: '', component: GetContactUsComponent },
          { path: 'edit', component: EditContactUsComponent },
        ],
      },
      {
        path: 'homepage',
        component: HomePageComponent,
        children: [
          { path: '', component: GetHomePageComponent },
          { path: 'edit', component: EditHomePageComponent },
        ],
      },
      {
        path: 'books',
        component: BooksComponent,
        children: [
          { path: '', component: AllBooksComponent },
          {
            path: 'add',
            component: AddBookComponent,
          },
          {
            path: 'edit/:id',
            component: EditBookComponent,
          },
        ],
      },
      {
        path: 'library',
        component: LibraryComponent,
        children: [
          { path: '', component: AllLibrariesComponent },
          {
            path: 'add',
            component: AddLibraryComponent,
          },
          {
            path: 'editcategory/:libraryId',
            component: EditLibraryCategoriesComponent,
          },
          {
            path: 'edit/:id',
            component: EditLibraryComponent,
          },
        ],
      },
      {
        path: 'category',
        component: CategoryComponent,
        children: [
          { path: '', component: AllCategoriesComponent },
          {
            path: 'add',
            component: AddCategoryComponent,
          },
          {
            path: 'edit/:id',
            component: EditCategoryComponent,
          },
        ],
      },
      {
        path: 'user',
        component: UsersComponent,
        children: [{ path: '', component: GetAllUsersComponent }],
      },
      {
        path: 'author',
        component: AuthorComponent,
        children: [
          { path: '', component: AllAuthorsComponent },
          {
            path: 'add',
            component: AddAuthorComponent,
          },
          {
            path: 'edit/:id',
            component: EditAuthorComponent,
          },
        ],
      },
      {
        path: 'offer',
        component: OfferComponent,
        children: [
          { path: '', component: AllOffersComponent },
          {
            path: 'add',
            component: AddOfferComponent,
          },
          {
            path: 'edit/:id',
            component: EditOfferComponent,
          },
        ],
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        children: [
          { path: '', component: GetAllFeedbackComponent },
          {
            path: 'info/:id',
            component: FeedbackInfoComponent,
          },
        ],
      },
      {
        path: 'testimonial',
        component: TestimonialComponent,
        children: [{ path: '', component: AllTestimonialComponent }],
      },
      {
        path: 'borrowed-books',
        component: BorrowedBooksComponent,
        children: [{ path: '', component: AllBorrowedBooksComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
