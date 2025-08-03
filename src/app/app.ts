import { Component, Injectable, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table } from './components/table/table';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Table],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'products';

  products = signal([
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Description for Product 1',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      description: 'Description for Product 2',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 300,
      description: 'Description for Product 3',
    },
  ]);

  constructor(private http: HttpClient) {}

  async ngOnInit() {
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
}
