import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restauranttable',
  imports: [CommonModule,FormsModule],
  templateUrl: './restauranttable.component.html',
  styleUrl: './restauranttable.component.css'
})
export class RestauranttableComponent implements OnInit {

  tables: any[] = [];
  userRole: string = '';

  newTable = {
    tableNumber: 0,
    capacity: 0,
    status: 'Available'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.loadTables();
  }

  loadTables(): void {
    this.apiService.getTables().subscribe({
      next: (data) => {
        this.tables = data;
      }
    });
  }

  addTable(): void {
    this.apiService.addTable(this.newTable).subscribe({
      next: () => {
        this.loadTables();

        this.newTable = {
          tableNumber: 0,
          capacity: 0,
          status: 'Available'
        };
      }
    });
  }

  updateStatus(tableId: number, status: string): void {
    this.apiService.updateTableStatus(tableId, status).subscribe({
      next: () => {
        this.loadTables();
      }
    });
  }

  deleteTable(tableId: number): void {
    this.apiService.deleteTable(tableId).subscribe({
      next: () => {
        this.loadTables();
      }
    });
  }
}