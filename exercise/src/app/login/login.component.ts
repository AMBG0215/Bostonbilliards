import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login successful:', response);
        
        // Redirect based on role
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error || 'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
