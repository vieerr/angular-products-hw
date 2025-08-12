import { Component, inject, Inject, Injectable, signal } from '@angular/core';
import { Table } from '../../table/table';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsForm } from '../../forms/products-form/products-form';
import { CategoryService } from '../../../services/category-service/category-service';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-products',
  imports: [Table, FormsModule, ProductsForm],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {


  categoryService = inject(CategoryService);
  categories = this.categoryService.categories;
  products = signal([]);
  newProduct = { name: '', price: 0 };

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const response = this.http.get('/api/products');
    response.subscribe({
      next: (products: any) => {
        products.forEach((product: any) => {
          const category = this.categories().find((cat: any) => cat.id === product.categoryId);
          product.category = category ? category.nombre : 'Sin categoría';
        });
        this.products.set(products);
      },
    });
  }

}
