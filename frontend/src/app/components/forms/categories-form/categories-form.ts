import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category-service/category-service';

@Component({
  selector: 'app-categories-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './categories-form.html',
  styleUrl: './categories-form.css'
})
export class CategoriesForm {
  private http = inject(HttpClient);
  categoryService = inject(CategoryService);
  categories = this.categoryService.categories;

  addCategory(categoryData: any) {
    this.http
      .post('http://localhost:8080/api/categories', categoryData)
      .subscribe({
        next: () => {
          alert('Category added successfully!');
        },
        error: (err: any) => {
          alert(`Error: ${err.message}`);
        },
      });
  }
}
