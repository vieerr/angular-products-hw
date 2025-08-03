import { Component, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table } from './components/table/table';
import { Products } from "./components/tabs/products/products";
import { Categories } from "./components/tabs/categories/categories";
import { MatIconModule } from '@angular/material/icon';
@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Table, Products, Categories, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'products';
}
