import { Component, Inject, Injectable, signal } from '@angular/core';
import { Table } from "../../table/table";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsForm } from "../../forms/products-form/products-form";

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-products',
  imports: [Table, FormsModule, ProductsForm],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  products = signal([]);
  newProduct = { name: '', price: 0 };

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // assuming our gateway is running on localhost:8080
    const response = this.http.get('http://localhost:8080/api/products');
    response.subscribe({
      next: (products: any) => {
        this.products.set(products);
      },
      error: (error) => {
        alert('Error fetching data: ' + error);
      },
    });
  }

  addProduct(product: any) {
    console.log('Adding product:', product);
  }

}
