import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, Signal } from '@angular/core';
import { ProductsEditForm } from "../forms/products-edit-form/products-edit-form";

@Component({
  selector: 'app-table',
  imports: [ProductsEditForm],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() title: string = 'Table Title';
  @Input({ required: true }) data!: Signal<any[]>;
  private http = inject(HttpClient);
  // categoryService = inject(CategoryService);
  // categories = this.categoryService.categories;

  addProduct(productData: any) {
    this.http
      .post('http://localhost:8080/api/products', productData)
      .subscribe({
        next: () => {
          alert('Product added successfully!');
        },
        error: (err: any) => {
          alert(`Error: ${err.message}`);
        },
      });
  }

 // Track which product is being edited
  productToEdit: any = null;
  showEditModal = false;

  edit = (item: any) => {
    this.productToEdit = { ...item }; // Create a copy for editing
    this.showEditModal = true;
  };
  delete = (item: any) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.http
        .delete(
          `http://localhost:8080/api/${
            item.price ? 'products' : 'categories'
          }/${item.id}`
        )
        .subscribe({
          next: () => {
            alert(
              `${item.price ? 'Product' : 'Category'} deleted successfully!`
            );
          },
          error: (err: any) => {
            alert(`Error: ${err.message}`);
          },
        });
    }
  };

  objectKeys = Object.keys;
}
