import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category-service/category-service';

@Component({
  selector: 'app-products-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './products-form.html',
  styleUrl: './products-form.css',
})
export class ProductsForm {
  private http = inject(HttpClient);
  categoryService = inject(CategoryService);
  categories = this.categoryService.categories;

  addProduct(productData: any) {
    this.http
      .post('/api/products', productData)
      .subscribe({
        next: () => {
          alert('Product added successfully!');
          window.location.reload();
        },
        error: (err: any) => {
          alert(`Error: ${err.message}`);
        },
      });
  }
}
