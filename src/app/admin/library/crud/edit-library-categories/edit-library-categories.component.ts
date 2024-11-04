import { Component, inject } from '@angular/core';
import { LibraryService } from '../../library.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { ActivatedRoute } from '@angular/router';
import { QUERYKEYS } from 'src/app/queries';
import { Category, LibraryCategory } from 'src/types';
import { EditLibraryCategory } from '../../types';
import { CategoryService } from 'src/app/admin/category/category.service';

@Component({
  selector: 'app-edit-library-categories',
  templateUrl: './edit-library-categories.component.html',
  styleUrls: ['./edit-library-categories.component.css'],
})
export class EditLibraryCategoriesComponent {
  bookForm: FormGroup;
  id: number | null = null;
  categoryNameToAdd: string = '';
  searchTerm: string = '';
  libraryService = inject(LibraryService);
  categoryService = inject(CategoryService);
  queryClient = injectQueryClient();

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    // Initialize form with validation
    this.bookForm = this.fb.group({
      bookname: ['', Validators.required],
    });
  }

  addCategoryMutation = injectMutation((client) => ({
    mutationFn: (editLibraryCategory: EditLibraryCategory) =>
      this.libraryService.addLibraryCategory(editLibraryCategory),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.categories] });
      client.invalidateQueries({ queryKey: [QUERYKEYS.librarycategories] });
      alert('Category Added updated successfully');
    },
  }));

  removeCategoryMutation = injectMutation((client) => ({
    mutationFn: (libraryCategoryId: number) =>
      this.libraryService.deleteLibraryCategory(libraryCategoryId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.categories] });
      client.invalidateQueries({ queryKey: [QUERYKEYS.librarycategories] });
      alert('Category Added updated successfully');
    },
  }));

  allCategoriesQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.categories],
    queryFn: async () => {
      const categories = await this.categoryService
        .getAllCategories
        // +(this.route.snapshot.paramMap.get('id') ?? 0)
        ();
      // here u should select all the already selected categories
      // if (categories) this.bookForm.patchValue(book);
      return categories;
    },
  }));

  allLibrariesCategoriesIds = injectQuery(() => ({
    queryKey: [QUERYKEYS.librarycategories],
    queryFn: async () => {
      const libraryCategories =
        await this.categoryService.getAllLibrariesCategories();

      return libraryCategories;
    },
  }));

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('libraryId') ?? 0);
  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.bookForm.patchValue({
        image: fileInput.files[0],
      });
    }
  }

  get isLoading() {
    return this.allCategoriesQuery.isLoading();
  }

  get isError() {
    return this.allCategoriesQuery.isError();
  }

  get errorMessage() {
    console.log(this.allCategoriesQuery.error);
    return (
      this.allCategoriesQuery.error || 'An error occurred while fetching data.'
    );
  }

  get LibraryCategoriesData() {
    const libraryCategoriesIds = this.allLibrariesCategoriesIds
      .data()
      ?.filter(
        (categ) =>
          categ.libraryid ===
          +(this.route.snapshot.paramMap.get('libraryId') ?? -1)
      )
      .map((categ) => categ.categoryid);

    return this.allCategoriesQuery
      .data()
      ?.filter((category: Category) =>
        libraryCategoriesIds?.includes(category.categoryid)
      )
      ?.filter((category: Category) =>
        category.categoryname
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
  }

  get AvailableCategoriesToAdd() {
    const libraryCategoriesIds = this.LibraryCategoriesData?.map(
      (c) => c.categoryid
    );

    return this.allCategoriesQuery
      .data()
      ?.filter(
        (category: Category) =>
          !libraryCategoriesIds?.includes(category.categoryid)
      );
  }

  async onAddCategory(categoryName: string | null) {
    if (!categoryName) {
      alert('Please select a category before adding.');
      return;
    }

    const selectedCategory = this.AvailableCategoriesToAdd?.find(
      (categ) => categ.categoryname === categoryName
    );

    if (!selectedCategory) {
      alert('Selected category is invalid or already added.');
      return;
    }

    const { categoryid } = selectedCategory;

    await this.addCategoryMutation.mutateAsync({
      categoryid,
      libraryid: +(this.route.snapshot.paramMap.get('libraryId') ?? 0),
    });
  }

  async onRemoveCategory(categoryId: number) {
    const { librarycategoryid } = this.allLibrariesCategoriesIds
      .data()
      ?.find(
        (libcat) =>
          libcat.categoryid === categoryId &&
          libcat.libraryid ===
            +(this.route.snapshot.paramMap.get('libraryId') ?? 0)
      )!;
    console.log(librarycategoryid);
    await this.removeCategoryMutation.mutateAsync(librarycategoryid);
  }
}
