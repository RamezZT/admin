import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIURL } from 'src';
import { Category, LibraryCategory } from 'src/types';
import { CreateCategoryType, EditCategoryType } from './types';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  createCategory(createCategory: CreateCategoryType): Promise<any> {
    console.log('Creating category:', JSON.stringify(createCategory));
    return this.http
      .post(`${APIURL}Category/add-category`, createCategory, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .toPromise();
  }

  getAllCategories(): Promise<Category[]> {
    return firstValueFrom(
      this.http.get<Category[]>(`${APIURL}Category/categories`)
    );
  }

  getAllLibrariesCategories(): Promise<LibraryCategory[]> {
    return firstValueFrom(
      this.http.get<LibraryCategory[]>(`${APIURL}LibraryCategory/AllLibCat`)
    );
  }

  getCategoryById(id: number): Promise<Category> {
    return firstValueFrom(this.http.get<Category>(`${APIURL}Category/${id}`));
  }

  deleteCategory(id: number) {
    this.http.delete<void>(`${APIURL}Category/${id}`).toPromise();
  }

  async editCategory(editCategory: EditCategoryType): Promise<any> {
    try {
      console.log('Editing category:', editCategory);
      if (editCategory.image) {
        const formData = new FormData();
        console.log(editCategory.image);
        formData.append('imageFile', editCategory.image);
        const imgRes = await firstValueFrom(
          this.http.put(
            `${APIURL}Category/upload-image/${editCategory.categoryid}`,
            formData
          )
        );
        console.log(imgRes);
      }
      const res = await firstValueFrom(
        this.http.put<string>(`${APIURL}Category/update-category`, editCategory)
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}
