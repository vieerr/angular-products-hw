import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Table } from "../../table/table";
import { CategoriesForm } from "../../forms/categories-form/categories-form";

@Component({
  selector: 'app-categories',
  imports: [Table, CategoriesForm],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {
  categories = signal([]);

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const response = this.http.get('/api/categories');
    response.subscribe({
      next: (categories: any) => {
        this.categories.set(categories);
      },
    });
  }
}
