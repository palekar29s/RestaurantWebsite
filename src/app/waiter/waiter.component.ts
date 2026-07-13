import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiter',
  imports: [CommonModule],
  templateUrl: './waiter.component.html',
  styleUrl: './waiter.component.css'
})
export class WaiterComponent {

userEmail: string = '';

constructor(private router: Router) {
this.userEmail = localStorage.getItem('email') || 'Waiter';
}

goToNewOrder(): void {
  this.router.navigate(['/order']);
}


goToOrders(): void {
this.router.navigate(['/myorders']);
}

goToPayments(): void {
this.router.navigate(['/mypayments']);
}

logout(): void {
localStorage.clear();
this.router.navigate(['/login']);
}
}