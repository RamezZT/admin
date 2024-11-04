import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { LibraryService } from '../../library.service';
import { CreateLibraryType, EditLibraryType } from '../../types';
import { QUERYKEYS } from 'src/app/queries';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-library',
  templateUrl: './edit-library.component.html',
  styleUrls: ['./edit-library.component.css'],
})
export class EditLibraryComponent implements OnInit {
  libraryForm: FormGroup;
  image: File | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.libraryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', Validators.required],
      longitude: [''],
      latitude: [''],
      // image: [null, Validators.required],
    });
  }
  libraryService = inject(LibraryService);
  queryClient = injectQueryClient();

  // Query to fetch book data by ID
  libraryQuery = injectQuery(() => ({
    queryKey: [
      QUERYKEYS.libraries,
      +(this.route.snapshot.paramMap.get('id') ?? -1),
    ],
    queryFn: async () => {
      const library = await this.libraryService.getLibraryById(
        +(this.route.snapshot.paramMap.get('id') ?? 0)
      );
      if (library) this.libraryForm.patchValue(library);
      return library;
    },
  }));

  ngOnInit() {
    if (this.libraryQuery.data()) {
      this.libraryForm.patchValue(this.libraryQuery.data()!);
    }
  }

  mutation = injectMutation((client) => ({
    mutationFn: (updatedLibrary: EditLibraryType) =>
      this.libraryService.editLibrary(
        +(this.route.snapshot.paramMap.get('id') ?? 0),
        {
          ...updatedLibrary,
          image: this.image ?? undefined,
          libraryid: +(this.route.snapshot.paramMap.get('id') ?? 0),
        }
      ), // Update the book by ID
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.libraries] });
      alert('Library updated successfully');
    },
  }));

  onFileChange(event: Event) {
    console.log('changed');
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.image = file;
    }
  }

  // Submit the updated book data
  onEditLibrary() {
    if (this.libraryForm.valid) {
      this.mutation.mutate(this.libraryForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
