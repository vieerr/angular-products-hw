import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category-service/category-service';

@Component({
  selector: 'app-categories-edit-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './categories-edit-form.html',
  styleUrl: './categories-edit-form.css',
})
export class CategoriesEditForm {
  private http = inject(HttpClient);
  categoryService = inject(CategoryService);

  @Input() category: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
    console.log('Category:', this.category);
  }

  updateCategory(categoryData: any) {
    if (!this.category?.id) {
      alert('Category ID is missing!');
      return;
    }
    this.http
      .patch(`/api/categories/${this.category.id}`, {
        ...categoryData,
      })
      .subscribe({
        next: () => {
          alert('Category updated successfully!');
          console.log('Category updated:', categoryData);
          window.location.reload();
        },
        error: (err: any) => {
          alert(`Error: ${err.message}`);
        },
      });
  }
}
