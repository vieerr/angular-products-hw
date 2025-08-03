import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Table } from "../../table/table";

@Component({
  selector: 'app-categories',
  imports: [Table],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {
  categories = signal([]);

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // assuming our gateway is running on localhost:8080
    const response = this.http.get('http://localhost:8080/api/categories');
    response.subscribe({
      next: (categories: any) => {
        this.categories.set(categories);
      },
      error: (error) => {
        alert('Error fetching data: ' + error);
      },
    });
  }
}
