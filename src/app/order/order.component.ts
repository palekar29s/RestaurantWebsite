import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  imports: [FormsModule,CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  userRole = localStorage.getItem('role');
  userId  = Number(localStorage.getItem('userId'));

  // Dropdown Data
  tables: any[] = [];
  categories: any[] = [];
  menuItems: any[] = [];
  filteredMenuItems: any[] = [];

  // Orders
  orders: any[] = [];

  // Current Selection
  selectedCategoryId = 0;
  selectedMenuItemId = 0;
  quantity = 1;

  // Create Order Request
  newOrder = {
  tableId: 0,
  items: [] as any[]
};

//payment 
payment = {
  paymentMethod: 'Cash',
  paymentStatus: 'Pending'
};

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.loadTables();
    this.loadCategories();
    this.loadMenuItems();
    this.loadOrders();

  }

  // ===========================
  // Load Data
  // ===========================

  loadTables() {

    this.api.getTables().subscribe({
      next: (res: any) => {
        this.tables = res;
      },
      error: err => console.log(err)
    });

  }

  loadCategories() {

    this.api.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: err => console.log(err)
    });

  }

  loadMenuItems() {

  this.api.getMenuItems().subscribe({

    next: (res: any) => {

      console.log("Menu Items:", res);

      this.menuItems = res;

      this.filteredMenuItems = res; // Temporary

      console.log("Filtered:", this.filteredMenuItems);

    },

    error: err => console.log(err)

  });

}

  loadOrders() {

    if (this.userRole === 'Admin' || this.userRole === 'Chef') {

      this.api.getOrders().subscribe({
        next: (res: any) => {
          this.orders = res;
        }
      });

    }
    else {

      this.api.getOrdersByWaiter(this.userId).subscribe({
        next: (res: any) => {
          this.orders = res;
        }
      });

    }

  }

  // ===========================
  // Category Changed
  // ===========================

  onCategoryChange() {

    this.filteredMenuItems = this.menuItems.filter(
      x => x.categoryId == this.selectedCategoryId &&
           x.isAvailable == true
    );

    this.selectedMenuItemId = 0;

  }

  // ===========================
  // Add Item
  // ===========================

  addItem() {

    if (this.selectedMenuItemId == 0) {
      alert("Select Menu Item");
      return;
    }

    const menu = this.menuItems.find(
      x => x.menuItemId == this.selectedMenuItemId
    );

    if (!menu) return;

    const existing = this.newOrder.items.find(
      x => x.menuItemId == menu.menuItemId
    );

    if (existing) {

      existing.quantity += this.quantity;

    } else {

      this.newOrder.items.push({

        menuItemId: menu.menuItemId,
        itemName: menu.itemName,
        price: menu.price,
        quantity: this.quantity

      });

    }

    this.selectedMenuItemId = 0;
    this.quantity = 1;

  }

  // ===========================
  // Remove Item
  // ===========================

  removeItem(index: number) {

    this.newOrder.items.splice(index, 1);

  }

  // ===========================
  // Total Amount
  // ===========================

  getTotal(): number {

    return this.newOrder.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

  }

  // ===========================
  // Place Order
  // ===========================

 placeOrder() {

  if (this.newOrder.tableId == 0) {
    alert("Please Select Table");
    return;
  }

  if (this.newOrder.items.length == 0) {
    alert("Please Add Menu Items");
    return;
  }

  const request = {

    tableId: this.newOrder.tableId,

    userId: this.userId,

    items: this.newOrder.items.map(x => ({
      menuItemId: x.menuItemId,
      quantity: x.quantity
    }))

  };

  this.api.createOrder(request).subscribe({

    next: (res: any) => {

      const paymentData = {

        paymentId: 0,
        orderId: res.orderId,
        amount: res.totalAmount,
        paymentMethod: this.payment.paymentMethod,
        paymentStatus: this.payment.paymentStatus,
        paidAt: new Date().toISOString()

      };

      this.api.addPayment(paymentData).subscribe({

        next: () => {

          alert("Order & Payment Created Successfully");

          this.loadOrders();
          this.resetOrder();

        },

        error: err => {

          console.log(err);
          alert("Order Created but Payment Failed");

        }

      });

    },

    error: err => {

      console.log(err);
      alert("Unable to Place Order");

    }

  });

}
  // ===========================
  // Reset Form
  // ===========================

  resetOrder() {

    this.newOrder = {

  tableId: 0,
  items: []

};

    this.selectedCategoryId = 0;
    this.selectedMenuItemId = 0;
    this.quantity = 1;
    this.filteredMenuItems = [];

  }

  // ===========================
  // Update Status
  // ===========================

  changeStatus(order: any, status: string) {

    this.api.updateOrderStatus(order.orderId, status).subscribe({

      next: () => {

        alert("Status Updated");
        this.loadOrders();

      }

    });

  }

  // ===========================
  // Delete Order
  // ===========================

  deleteOrder(orderId: number) {

    if (!confirm("Delete Order?"))
      return;

    this.api.deleteOrder(orderId).subscribe({

      next: () => {

        alert("Order Deleted");
        this.loadOrders();

      }

    });

  }

}