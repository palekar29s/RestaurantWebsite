import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashier',
  imports: [CommonModule],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CashierComponent {

  userEmail: string = '';

  constructor(private router: Router) {
    this.userEmail = localStorage.getItem('email') || '';
  }

  goToPayments(): void {
    this.router.navigate(['/payments']);
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}