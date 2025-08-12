import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

interface Category {
  id: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;  
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);

  private _categories = signal<Category[]>([]);

  private uri = '/api/categories';

  categories = computed(() => this._categories());

  isLoading = signal(false);

  error = signal<string | null>(null);

  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading.set(true);
    this.error.set(null);

    this.http
      .get<Category[]>(this.uri)
      .pipe(
        tap((categories) => {
          this._categories.set(categories);
          this.isLoading.set(false);
        }),
        catchError((err) => {
          this.error.set(err.message);
          this.isLoading.set(false);
          return of([]);
        })
      )
      .subscribe();
  }

  addCategory(category: Omit<Category, 'id'>) {
    this.isLoading.set(true);

    return this.http.post<Category>(this.uri, category).pipe(
      tap((newCategory) => {
        this._categories.update((categories) => [...categories, newCategory]);
      }),
      catchError((err) => {
        this.error.set(err.message);
        return of(null);
      }),
      tap(() => this.isLoading.set(false))
    );
  }

  updateCategory(updatedCategory: Category) {
    this.isLoading.set(true);

    return this.http
      .put<Category>(`${this.uri}/${updatedCategory.id}`, updatedCategory)
      .pipe(
        tap((returnedCategory) => {
          this._categories.update((categories) =>
            categories.map((cat) =>
              cat.id === returnedCategory.id ? returnedCategory : cat
            )
          );
        }),
        catchError((err) => {
          this.error.set(err.message);
          return of(null);
        }),
        tap(() => this.isLoading.set(false))
      );
  }

  deleteCategory(id: string) {
    this.isLoading.set(true);

    return this.http.delete(`${this.uri}/${id}`).pipe(
      tap(() => {
        this._categories.update((categories) =>
          categories.filter((cat) => cat.id !== id)
        );
      }),
      catchError((err) => {
        this.error.set(err.message);
        return of(null);
      }),
      tap(() => this.isLoading.set(false))
    );
  }
}
