import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './products-form.html',
  styleUrl: './products-form.css',
})
export class ProductsForm {
  private http = inject(HttpClient);

  productsModal!: HTMLDialogElement;


  addProduct(productData: any) {
    this.http.post('http://localhost:8080/api/products', productData).subscribe({
      next: () => {
        alert('Product added successfully!');
        // this.closeModal();
      },
      error: (err: any) => {
        alert(`Error: ${err.message}`);
      },
    });
  }
}
