import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  userEmail: string = '';

  constructor(private router: Router) {
    this.userEmail = localStorage.getItem('email') || '';
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToTables(): void {
    this.router.navigate(['/restaurant-table']);
  }

  goToCategories(): void {
    this.router.navigate(['/categories']);
  }

  goToMenu(): void {
    this.router.navigate(['/menu-items']);
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  goToPayments(): void {
    this.router.navigate(['/mypayments']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
