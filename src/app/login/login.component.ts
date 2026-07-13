import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj = {
    email: '',
    password: ''
  };

  loginError: string = '';
  isLoggedIn: boolean = false;
  userEmail: string = '';
  passwordType: string = 'password';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.checkLoginStatus();
  }

  onLogin(): void {
    this.apiService.login(this.loginObj).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);

        // Save JWT + Role
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userId', res.userId.toString());






        // Save entered email manually
        localStorage.setItem('email', this.loginObj.email);

        this.isLoggedIn = true;
        this.userEmail = this.loginObj.email;
        this.loginError = '';

        // Role-based navigation
        switch (res.role) {
          case 'Admin':
            this.router.navigate(['/admin']);
            break;

          case 'Waiter':
            this.router.navigate(['/waiter']);
            break;

          case 'Chef':
            this.router.navigate(['/chef']);
            break;

          case 'Cashier':
            this.router.navigate(['/cashier']);
            break;

          default:
            this.router.navigate(['/login']);
            break;
        }
      },
      error: () => {
        this.loginError = 'Invalid Email or Password';
      }
    });
  }

  logout(): void {
    localStorage.clear();

    this.isLoggedIn = false;
    this.userEmail = '';

    this.loginObj = {
      email: '',
      password: ''
    };

    this.router.navigate(['/login']);
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token) {
      this.isLoggedIn = true;
      this.userEmail = email || '';
    }
  }

  togglePasswordVisibility(): void {
    this.passwordType =
      this.passwordType === 'password' ? 'text' : 'password';
  }
}