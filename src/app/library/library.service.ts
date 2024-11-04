import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIURL } from 'src';
import { Library, LibraryCategory } from 'src/types';
import {
  CreateLibraryType,
  EditLibraryCategory,
  EditLibraryType,
} from './types';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}

  // Post Functions
  async createLibrary(createLibrary: CreateLibraryType) {
    try {
      const { id } = await firstValueFrom(
        this.http.post<{ id: number }>(`${APIURL}Library/add-library`, {
          ...createLibrary,
          image: null,
        })
      );
      const formData = new FormData();
      formData.append('imageFile', createLibrary.image);
      console.log(createLibrary.image);
      console.log(id);
      await lastValueFrom(
        this.http.put(`${APIURL}Library/upload-image/${id}`, formData)
      );
    } catch (error) {
      console.error('Error creating library:', error);
      throw error;
    }
  }

  async editLibrary(id: number, editLibrary: EditLibraryType): Promise<void> {
    try {
      const token = localStorage.getItem('token');

      if (editLibrary.image) {
        const formData = new FormData();
        formData.append('imageFile', editLibrary.image);

        const imageResponse = await fetch(
          `${APIURL}Library/upload-image/${id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!imageResponse.ok) {
          throw new Error(`Image upload failed: ${imageResponse.statusText}`);
        }
      }

      const updateResponse = await fetch(`${APIURL}Library/update-library`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editLibrary,
          image: null,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(`Library update failed: ${updateResponse.statusText}`);
      }

      console.log('Library updated successfully');
    } catch (error) {
      console.error('Error editing library:', error);
      throw error; // Rethrow or handle the error appropriately
    }
  }

  async getAllLibraries(): Promise<Library[]> {
    try {
      return await firstValueFrom(
        this.http.get<Library[]>(`${APIURL}Library/libraries`)
      );
    } catch (error) {
      console.error('Error fetching all libraries:', error);
      throw error;
    }
  }

  async deleteLibrary(id: number) {
    try {
      await firstValueFrom(
        this.http.delete(`${APIURL}Library/delete-library/${id}`)
      );
    } catch (error) {
      console.error('Error deleting library:', error);
      throw error;
    }
  }

  async getLibraryById(id: number): Promise<Library> {
    try {
      return await firstValueFrom(
        this.http.get<Library>(`${APIURL}Library/${id}`)
      );
    } catch (error) {
      console.error('Error fetching library by ID:', error);
      throw error;
    }
  }

  async addLibraryCategory(editLibraryCategory: EditLibraryCategory) {
    try {
      await firstValueFrom(
        this.http.post(
          `${APIURL}LibraryCategory/CreateLibCat`,
          editLibraryCategory
        )
      );
    } catch (error) {
      console.error('Error adding library category:', error);
      throw error;
    }
  }

  async deleteLibraryCategory(libraryCategoryId: number) {
    try {
      await firstValueFrom(
        this.http.delete(`${APIURL}LibraryCategory?id=${libraryCategoryId}`)
      );
    } catch (error) {
      console.error('Error deleting library category:', error);
      throw error;
    }
  }

  async getAllLibraryCategories(): Promise<LibraryCategory[]> {
    try {
      return await firstValueFrom(
        this.http.get<LibraryCategory[]>(`${APIURL}LibraryCategory/AllLibCat`)
      );
    } catch (error) {
      console.error('Error fetching all library categories:', error);
      throw error;
    }
  }
}
