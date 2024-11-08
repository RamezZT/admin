import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { BorrowedBooksService } from '../../borrowed-books.service';
import { BorrowedBook } from 'src/types';

@Component({
  selector: 'app-all-borrowed-books',
  templateUrl: './all-borrowed-books.component.html',
  styleUrls: ['./all-borrowed-books.component.css'],
})
export class AllBorrowedBooksComponent implements OnInit {
  borrowedBooksService = inject(BorrowedBooksService);
  route = inject(ActivatedRoute);
  userId: string | null = null; // Initialize to store userId
  searchTerm = '';
  startDate: string = '';
  endDate: string = '';

  ngOnInit() {
    // Subscribe to query parameters
    this.route.queryParams.subscribe((params) => {
      this.userId = params['id']; // Get the user ID from the query parameters
      this.query.refetch(); // Refetch data whenever userId changes
    });
  }

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.allBorrowedBooks, this.userId],
    queryFn: () => {
      return this.userId
        ? this.borrowedBooksService.getBorrowedBooksByUserId(+this.userId)
        : this.borrowedBooksService.getAllBorrowedBooks();
    },
  }));

  mutation = injectMutation((client) => ({
    mutationFn: async (borrowedBook: BorrowedBook) => {
      await this.borrowedBooksService.changeBorrowedBookStatus(borrowedBook);
    },
    onSuccess: () => {
      client.refetchQueries({
        queryKey: [QUERYKEYS.allBorrowedBooks, this.userId],
      });
    },
  }));

  handleStatusChange(id: number) {
    const book = this.query.data()?.find((book) => book.id === id);
    console.log(book);
    if (!book) return;
    this.mutation.mutate(book);
  }

  get isLoading() {
    return this.query.isLoading();
  }

  get isError() {
    return this.query.isError();
  }

  get errorMessage() {
    return this.query.error || 'An error occurred while fetching data.';
  }

  get BorrowedBooksData() {
    return this.query.data();
  }

  filteredBorrowedBooks() {
    const books = this.BorrowedBooksData || [];
    return books.filter((book) => {
      const borrowingDate = new Date(book.borrowingdate!);
      const dueDate = new Date(book.duedate!);
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      const isWithinDateRange =
        (!this.startDate || borrowingDate >= startDate) &&
        (!this.endDate || borrowingDate <= endDate);

      const matchesSearchTerm = this.searchTerm
        ? book.library
            ?.name!.toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        : true;

      return isWithinDateRange && matchesSearchTerm;
    });
  }
}
