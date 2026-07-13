import { DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myorders',
  imports: [NgFor,DatePipe,RouterLink],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})
export class MyordersComponent implements OnInit {

  orderList: any[] = [];
  waiterId: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.waiterId = Number(localStorage.getItem('userId'));
    this.loadOrders();
  }

  loadOrders() {
    this.api.getOrdersByWaiter(this.waiterId).subscribe({
      next: (res: any) => {
        this.orderList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateOrderStatus(order: any) {
    // Call your update API here
  }

  deleteOrder(orderId: number) {
    this.api.deleteOrder(orderId).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}