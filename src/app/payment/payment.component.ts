import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  payments: any[] = [];
  userRole: string = '';

  newPayment = {
    orderId: 0,
    amount: 0,
    paymentMethod: '',
    paymentStatus: 'Pending',
    paidAt: new Date().toISOString()
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.loadPayments();
  }

  loadPayments(): void {
    this.apiService.getPayments().subscribe({
      next: (data) => {
        this.payments = data;
      }
    });
  }

  addPayment(): void {
    this.apiService.addPayment(this.newPayment).subscribe({
      next: () => {
        this.loadPayments();

        this.newPayment = {
          orderId: 0,
          amount: 0,
          paymentMethod: '',
          paymentStatus: 'Pending',
          paidAt: new Date().toISOString()
        };
      }
    });
  }

updatePayment(payment: any): void {
  this.apiService.updatePayment(payment).subscribe({
    next: () => {
      this.loadPayments();
    }
  });
}

changePaymentStatus(payment: any, status: string): void {
  const updatedPayment = {
    ...payment,
    paymentStatus: status
  };

  this.updatePayment(updatedPayment);
}
}
