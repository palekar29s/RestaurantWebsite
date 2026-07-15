import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

private loginApi = 'https://somethingnew-y4g9.onrender.com/api/Login';
private restaurantApi = 'https://somethingnew-y4g9.onrender.com/api/RestaurantMenu';
private orderApi = 'https://somethingnew-y4g9.onrender.com/api/OrCaPay';

  constructor(private http: HttpClient) { }

  // ==========================
  // LOGIN
  // ==========================

  login(data: any): Observable<any> {
    return this.http.post(`${this.loginApi}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.loginApi}/register`, data);
  }

  // ==========================
  // RESTAURANT TABLES
  // ==========================

  getTables(): Observable<any> {
    return this.http.get(`${this.restaurantApi}/GetRestaurantTables`);
  }

  addTable(data: any): Observable<any> {
    return this.http.post(`${this.restaurantApi}/AddRestaurantTable`, data);
  }

  updateRestaurantTable(data: any): Observable<any> {
    return this.http.put(`${this.restaurantApi}/UpdateRestaurantTable`, data);
  }

  updateTableStatus(tableId: number, status: string): Observable<any> {
    return this.http.put(
      `${this.restaurantApi}/UpdateTableStatus/${tableId}`,
      JSON.stringify(status),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  deleteTable(tableId: number): Observable<any> {
    return this.http.delete(`${this.restaurantApi}/DeleteRestaurantTable/${tableId}`);
  }

  // ==========================
  // CATEGORIES
  // ==========================
getCategories(): Observable<any> {
  return this.http.get(`${this.orderApi}/GetCategories`);
}

addCategory(data: any): Observable<any> {
  return this.http.post(`${this.orderApi}/AddCategory`, data);
}

updateCategory(data: any): Observable<any> {
  return this.http.put(`${this.orderApi}/UpdateCategory`, data);
}

updateCategoryStatus(categoryId: number, isActive: boolean): Observable<any> {
  return this.http.put(
    `${this.orderApi}/UpdateCategoryStatus/${categoryId}`,
    isActive
  );
}

deleteCategory(categoryId: number): Observable<any> {
  return this.http.delete(`${this.orderApi}/DeleteCategory/${categoryId}`);
}
  // ==========================
  // MENU ITEMS
  // ==========================

  getMenuItems(): Observable<any> {
    return this.http.get(`${this.restaurantApi}/GetMenuItems`);
  }

  addMenuItem(data: any): Observable<any> {
    return this.http.post(`${this.restaurantApi}/AddMenuItem`, data);
  }

  updateMenuItem(data: any): Observable<any> {
    return this.http.put(`${this.restaurantApi}/UpdateMenuItem`, data);
  }

  updateMenuAvailability(menuItemId: number, isAvailable: boolean): Observable<any> {
    return this.http.put(
      `${this.restaurantApi}/UpdateMenuAvailability/${menuItemId}`,
      isAvailable
    );
  }

  deleteMenuItem(menuItemId: number): Observable<any> {
    return this.http.delete(`${this.restaurantApi}/DeleteMenuItem/${menuItemId}`);
  }

  // ==========================
  // ORDERS
  // ==========================

  createOrder(data: any): Observable<any> {
    return this.http.post(`${this.orderApi}/CreateOrder`, data);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.orderApi}/GetOrders`);
  }

  getOrdersByWaiter(waiterId: number): Observable<any> {
    return this.http.get(`${this.orderApi}/GetOrdersByWaiter/${waiterId}`);
  }

  getOrderItems(): Observable<any> {
    return this.http.get(`${this.orderApi}/GetOrderItems`);
  }

  getOrderItemsByOrder(orderId: number): Observable<any> {
    return this.http.get(`${this.orderApi}/GetOrderItemsByOrder/${orderId}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(
      `${this.orderApi}/UpdateOrderStatus/${orderId}`,
      JSON.stringify(status),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  updateOrderItemStatus(orderItemId: number, status: string): Observable<any> {
    return this.http.put(
      `${this.orderApi}/UpdateOrderItemStatus/${orderItemId}`,
      JSON.stringify(status),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  deleteOrder(id: number): Observable<any> {
  return this.http.delete(
    `${this.orderApi}/DeleteOrder/${id}`,
    { responseType: 'text' }
  );
}

  // ==========================
  // PAYMENTS
  // ==========================

  getPayments(): Observable<any> {
    return this.http.get(`${this.orderApi}/GetPayments`);
  }

  getPaymentByOrder(orderId: number): Observable<any> {
    return this.http.get(`${this.orderApi}/GetPaymentByOrder/${orderId}`);
  }

  addPayment(data: any): Observable<any> {
    return this.http.post(`${this.orderApi}/AddPayment`, data);
  }

  updatePayment(data: any): Observable<any> {
  return this.http.put(
    `${this.orderApi}/UpdatePayment`,
    data,
    { responseType: 'text' }
  );
}

  deletePayment(paymentId: number): Observable<any> {
    return this.http.delete(`${this.orderApi}/DeletePayment/${paymentId}`);
  }
  getPaymentsByUser(userId: number) {
  return this.http.get(`${this.orderApi}/GetPaymentsByUser/${userId}`);
}

}