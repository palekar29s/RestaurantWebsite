import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerObj = {
    fullName: '',
    email: '',
    passwordHash: '',
    role: ''
  };

  registerMessage: string = '';
  registerError: string = '';
  passwordType: string = 'password';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  onRegister(): void {
    this.apiService.register(this.registerObj).subscribe({
      next: (res: any) => {
        this.registerMessage = 'Staff registered successfully';
        this.registerError = '';

        this.registerObj = {
          fullName: '',
          email: '',
          passwordHash: '',
          role: ''
        };
      },
      error: () => {
        this.registerError = 'Registration failed';
      }
    });
  }
}
