import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category-service/category-service';

@Component({
  selector: 'app-products-edit-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './products-edit-form.html',
  styleUrl: './products-edit-form.css',
})
export class ProductsEditForm {
  private http = inject(HttpClient);
  categoryService = inject(CategoryService);
  categories = this.categoryService.categories;

  @Input() product: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  ngOnInit() {
    console.log('Product:', this.product);
  }
  updateProduct(productData: any) {
    if (!this.product?.id) {
      alert('Product ID is missing!');
      return;
    }
    this.http
      .put(`/api/products/${this.product.id}`, {
        ...productData,
        categoryId: Number(productData.categoryId),
      })
      .subscribe({
        next: () => {
          alert('Product updated successfully!');
          console.log('Product updated:', productData);
          window.location.reload();
        },
        error: (err: any) => {
          alert(`Error: ${err.message}`);
        },
      });
  }
}
