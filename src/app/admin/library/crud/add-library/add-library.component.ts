import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectMutation,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { LibraryService } from '../../library.service';
import { CreateLibraryType } from '../../types';
import { QUERYKEYS } from 'src/app/queries';
@Component({
  selector: 'app-add-library',
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.css'],
})
export class AddLibraryComponent {
  libraryForm: FormGroup;
  image: File | null = null;
  constructor(private fb: FormBuilder) {
    this.libraryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', Validators.required],
      longitude: [''],
      latitude: [''],
    });
  }
  libraryService = inject(LibraryService);
  queryClient = injectQueryClient();

  mutation = injectMutation((client) => ({
    mutationFn: (createLibrary: CreateLibraryType) =>
      this.libraryService.createLibrary(createLibrary),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.libraries] });
      alert('created');
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

  onCreateLibrary() {
    if (!this.libraryForm.valid) return alert('invalid Form');
    this.mutation.mutate({ ...this.libraryForm.value, image: this.image });
  }
}
