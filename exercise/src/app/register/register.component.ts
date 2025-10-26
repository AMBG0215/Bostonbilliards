import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterRequest = {
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  };
  
  confirmPassword = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Registration successful:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error || 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    });
  }

  private validateForm(): boolean {
    if (!this.registerData.firstname || !this.registerData.lastname || 
        !this.registerData.email || !this.registerData.password) {
      this.error = 'Please fill in all required fields';
      return false;
    }

    if (this.registerData.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return false;
    }

    if (this.registerData.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerData.email)) {
      this.error = 'Please enter a valid email address';
      return false;
    }

    return true;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
