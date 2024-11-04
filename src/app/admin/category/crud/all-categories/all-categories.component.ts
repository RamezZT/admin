import { Component, inject } from '@angular/core';
import { CategoryService } from '../../category.service';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { Category } from 'src/types';
import { IMGPATH } from 'src';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css'],
})
export class AllCategoriesComponent {
  categoriesService = inject(CategoryService);
  queryClient = injectQueryClient();
  searchTerm: string = '';
  IMGPATH = IMGPATH;
  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.categories],
    queryFn: async () => {
      const data = await this.categoriesService.getAllCategories();
      return data;
    },
  }));

  deleteMutation = injectMutation((client) => ({
    mutationFn: async (id: number) =>
      await this.categoriesService.deleteCategory(id), // Update the author by ID
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.categories] });
      alert('Category Deleted successfully');
    },
  }));

  async onDeleteCategory(id: number) {
    await this.deleteMutation.mutateAsync(id);
  }

  get isLoading() {
    return this.query.isLoading();
  }

  get isError() {
    return this.query.isError();
  }

  get errorMessage() {
    console.log(this.query.error());
    return this.query.error || 'An error occurred while fetching data.';
  }

  get categoriesData() {
    // Filter the libraries based on the searchTerm
    return this.query
      .data()
      ?.filter((category: Category) =>
        category.categoryname
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
  }
}
