import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mypayments',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './mypayments.component.html',
  styleUrl: './mypayments.component.css'
})
export class MypaymentsComponent implements OnInit {

  paymentList: any[] = [];

  waiterId: number = Number(localStorage.getItem('userId'));

  paymentObj = {
    orderId: '',
    amount: '',
    paymentMethod: 'Cash',
    status: 'Paid'
  };

  selectedPayment: any = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

 loadPayments() {

  const userId = Number(localStorage.getItem('userId'));

  this.api.getPaymentsByUser(userId).subscribe((res: any) => {
    this.paymentList = res;
  });

}

  addPayment(){

    this.api.addPayment({
      ...this.paymentObj,
      userId:this.waiterId
    }).subscribe(()=>{

      this.loadPayments();

      this.paymentObj={
        orderId:'',
        amount:'',
        paymentMethod:'Cash',
        status:'Paid'
      }

    })

  }

  editPayment(payment:any){

    this.selectedPayment={...payment};

  }

 updatePayment() {

  console.log(this.selectedPayment);

  this.api.updatePayment(this.selectedPayment).subscribe({
    next: (res) => {
      console.log(res);
      this.selectedPayment = null;
      this.loadPayments();
    },
    error: (err) => {
      console.log(err);
    }
  });

}

}