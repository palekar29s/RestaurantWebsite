import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menuitem',
  imports: [CommonModule,FormsModule],
  templateUrl: './menuitem.component.html',
  styleUrl: './menuitem.component.css'
})
export class MenuitemComponent implements OnInit {

  menuItems: any[] = [];
  categories: any[] = [];
  userRole: string = '';

  newItem = {
    categoryId: 0,
    itemName: '',
    price: 0,
    isAvailable: true
  };

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.loadMenuItems();
    this.loadCategories();
  }

  loadMenuItems(): void {
    this.apiService.getMenuItems().subscribe({
      next: (data) => {
        this.menuItems = data;
      }
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });
  }

  addMenuItem(): void {
    this.apiService.addMenuItem(this.newItem).subscribe({
      next: () => {
        this.loadMenuItems();

        this.newItem = {
          categoryId: 0,
          itemName: '',
          price: 0,
          isAvailable: true
        };
      }
    });
  }

  updateMenuItem(item: any): void {
    this.apiService.updateMenuItem(item).subscribe({
      next: () => {
        this.loadMenuItems();
      }
    });
  }

  deleteMenuItem(menuItemId: number): void {
    this.apiService.deleteMenuItem(menuItemId).subscribe({
      next: () => {
        this.loadMenuItems();
      }
    });
  }
}