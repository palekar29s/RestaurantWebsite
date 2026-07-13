import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { guardroleGuard } from './guardrole.guard';
import { authguardGuard } from './authguard.guard';
import { WaiterComponent } from './waiter/waiter.component';
import { AdminComponent } from './admin/admin.component';
import { CashierComponent } from './cashier/cashier.component';
import { ChefComponent } from './chef/chef.component';
import { LoginComponent } from './login/login.component';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { RestauranttableComponent } from './restauranttable/restauranttable.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MypaymentsComponent } from './mypayments/mypayments.component';

export const routes: Routes = [

    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },


   { path: '', component: HomeComponent }, // default route
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'admin', component: AdminComponent },
  { path: 'cashier', component: CashierComponent },
  { path: 'chef', component: ChefComponent },
  { path: 'waiter', component: WaiterComponent },

  { path: 'menuitem', component: MenuitemComponent },
  { path: 'order', component: OrderComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'restauranttable', component: RestauranttableComponent },
  
{ path: 'myorders', component: MyordersComponent },
{ path: 'mypayments', component: MypaymentsComponent },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authguardGuard, guardroleGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'waiter',
    loadComponent: () => import('./waiter/waiter.component').then(m => m.WaiterComponent),
    canActivate: [authguardGuard, guardroleGuard],
    data: { role: 'Waiter' }
  },
  {
    path: 'chef',
    loadComponent: () => import('./chef/chef.component').then(m => m.ChefComponent),
    canActivate: [authguardGuard, guardroleGuard],
    data: { role: 'Chef' }
  },
  {
    path: 'cashier',
    loadComponent: () => import('./cashier/cashier.component').then(m => m.CashierComponent),
    canActivate: [authguardGuard, guardroleGuard],
    data: { role: 'Cashier' }
  },
];
