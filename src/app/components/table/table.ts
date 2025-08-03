import { Component, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  @Input() title: string = 'Table Title';
  @Input({required: true}) data!: Signal<any[]>;

  edit = (item: any) => {
    console.log('Edit action triggered for item:', item);
  }

  delete = (item: any) => {
    console.log('Delete action triggered for item:', item);
  }

  objectKeys = Object.keys;
}
