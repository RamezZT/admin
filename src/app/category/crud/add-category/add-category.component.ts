import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectMutation,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { CategoryService } from 'src/app/category/category.service';
import { CreateCategoryType } from '../../types';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      categoryname: ['', Validators.required],
      iconpath: [''],
    });
  }

  categoriesService = inject(CategoryService);
  queryClient = injectQueryClient();

  mutation = injectMutation((client) => ({
    mutationFn: (createCategory: CreateCategoryType) =>
      this.categoriesService.createCategory(createCategory),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.categories] });
      alert('Category created successfully');
    },
  }));

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.categoryForm.patchValue({
        iconpath: fileInput.files[0],
      });
    }
  }

  onCreateCategory() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.mutation.mutate(categoryData);
    } else {
      console.log('Form is invalid');
    }
  }
}
