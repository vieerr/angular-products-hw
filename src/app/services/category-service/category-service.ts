// src/app/services/category.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

interface Category {
  id: string;
  name: string;
  slug: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  
  // Signal containing all categories
  private _categories = signal<Category[]>([]);
  
  // Public computed signal (readonly)
  categories = computed(() => this._categories());
  
  // Loading state
  isLoading = signal(false);
  
  // Error state
  error = signal<string | null>(null);

  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.http.get<Category[]>('/api/categories')
      .pipe(
        tap(categories => {
          this._categories.set(categories);
          this.isLoading.set(false);
        }),
        catchError(err => {
          this.error.set(err.message);
          this.isLoading.set(false);
          return of([]);
        })
      )
      .subscribe();
  }

  addCategory(category: Omit<Category, 'id'>) {
    this.isLoading.set(true);
    
    return this.http.post<Category>('/api/categories', category)
      .pipe(
        tap(newCategory => {
          this._categories.update(categories => [...categories, newCategory]);
        }),
        catchError(err => {
          this.error.set(err.message);
          return of(null);
        }),
        tap(() => this.isLoading.set(false))
      );
  }

  updateCategory(updatedCategory: Category) {
    this.isLoading.set(true);
    
    return this.http.put<Category>(`/api/categories/${updatedCategory.id}`, updatedCategory)
      .pipe(
        tap(returnedCategory => {
          this._categories.update(categories => 
            categories.map(cat => 
              cat.id === returnedCategory.id ? returnedCategory : cat
            )
          );
        }),
        catchError(err => {
          this.error.set(err.message);
          return of(null);
        }),
        tap(() => this.isLoading.set(false))
      );
  }

  deleteCategory(id: string) {
    this.isLoading.set(true);
    
    return this.http.delete(`/api/categories/${id}`)
      .pipe(
        tap(() => {
          this._categories.update(categories => 
            categories.filter(cat => cat.id !== id)
          );
        }),
        catchError(err => {
          this.error.set(err.message);
          return of(null);
        }),
        tap(() => this.isLoading.set(false))
      );
  }
}