import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, Signal } from '@angular/core';
import { ProductsEditForm } from '../forms/products-edit-form/products-edit-form';
import { CommonModule } from '@angular/common';
import { CategoriesEditForm } from "../forms/categories-edit-form/categories-edit-form";

@Component({
  selector: 'app-table',
  imports: [ProductsEditForm, CommonModule, CategoriesEditForm],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() title: string = 'Table Title';
  @Input({ required: true }) data!: Signal<any[]>;
  @Input() type: 'products' | 'categories' = 'products'; // Add type input
  private http = inject(HttpClient);

  // Track which product/category is being edited
  productToEdit: any = null;
  showEditModal = false;

  categoryToEdit: any = null;
  showCategoryEditModal = false;

  addItem(itemData: any) {
    const endpoint =
      this.type === 'products'
        ? 'http://localhost:8080/api/products'
        : 'http://localhost:8080/api/categories';
    this.http.post(endpoint, itemData).subscribe({
      next: () => {
        alert(
          `${this.type === 'products' ? 'Product' : 'Category'} added successfully!`
        );
        window.location.reload();
      },
      error: (err: any) => {
        alert(`Error: ${err.message}`);
      },
    });
  }

  edit = (item: any) => {
    if (this.type === 'products') {
      this.productToEdit = { ...item };
      this.showEditModal = true;
    } else {
      this.categoryToEdit = { ...item };
      this.showCategoryEditModal = true;
    }
  };

  delete = (item: any) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${this.type === 'products' ? 'product' : 'category'}?`
      )
    ) {
      this.http
        .delete(`http://localhost:8080/api/${this.type}/${item.id}`)
        .subscribe({
          next: () => {
            alert(
              `${this.type === 'products' ? 'Product' : 'Category'} deleted successfully!`
            );
            window.location.reload();
          },
          error: (err: any) => {
            alert(`Error: ${err.message}`);
          },
        });
    }
  };

  objectKeys = Object.keys;
}
