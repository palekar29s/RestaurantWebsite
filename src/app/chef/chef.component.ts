import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chef',
  imports: [CommonModule],
  templateUrl: './chef.component.html',
  styleUrl: './chef.component.css'
})
export class ChefComponent  {

  userEmail: string = '';

  constructor(private router: Router) {
    this.userEmail = localStorage.getItem('email') || '';
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
