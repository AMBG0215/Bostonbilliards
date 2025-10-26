# Boston Billiards Authentication System Setup

## Overview
I've implemented a complete authentication system for your Boston Billiards application that solves the account management problem. Here's what's been added:

## ✅ What's Been Implemented

### Backend (Spring Boot)
1. **Authentication Dependencies**: Added Spring Security and JWT support
2. **Enhanced Customer Entity**: Added password, role, and enabled fields
3. **JWT Authentication**: Token-based authentication system
4. **Auth Service**: Handles registration and login
5. **Security Configuration**: Protects routes based on user roles
6. **Database Schema**: Updated to include authentication fields

### Frontend (Angular)
1. **Authentication Service**: Manages login/logout and token storage
2. **Login Component**: User login form
3. **Register Component**: User registration form
4. **Auth Guards**: Protect routes requiring authentication
5. **Updated Header**: Shows login/logout buttons and user info
6. **Role-based Views**: Different views for customers vs admins

## 🚀 How to Run

### 1. Update Database
First, run the database update script:
```sql
-- Run this in your MySQL database
source ecom/ecom/update_customer_auth.sql
```

### 2. Start Backend
```bash
cd BostonBilliards
./mvnw spring-boot:run
```

### 3. Start Frontend
```bash
cd exercise
npm install
ng serve
```

## 👥 User Accounts

### Default Admin Account
- **Email**: admin@bostonbilliards.com
- **Password**: admin123
- **Role**: ADMIN

### Customer Registration
- Customers can now register with email/password
- All new customers get "CUSTOMER" role by default
- Customers can only see their own orders

## 🔐 How Authentication Works

### For Customers:
1. **Register** → Create account with email/password
2. **Login** → Get JWT token for session
3. **Shop** → Browse products (no auth required)
4. **Order** → Place orders (auth required)
5. **View Orders** → See only their own orders

### For Admins:
1. **Login** → Use admin credentials
2. **View All Orders** → See all customer orders
3. **Manage System** → Full access to all features

## 🛡️ Security Features

- **Password Encryption**: BCrypt hashing
- **JWT Tokens**: Secure session management
- **Route Protection**: Guards prevent unauthorized access
- **Role-based Access**: Different permissions for customers vs admins
- **CORS Configuration**: Secure cross-origin requests

## 📱 User Experience

### Before Authentication:
- ❌ No way to create accounts
- ❌ No way to login
- ❌ Orders visible to everyone
- ❌ No user management

### After Authentication:
- ✅ Easy registration process
- ✅ Secure login/logout
- ✅ Personal order history
- ✅ Admin can manage all orders
- ✅ Role-based access control

## 🔧 Key Files Modified/Created

### Backend:
- `pom.xml` - Added security dependencies
- `CustomerData.java` - Added auth fields
- `AuthService.java` - Authentication logic
- `AuthController.java` - Login/register endpoints
- `SecurityConfig.java` - Security configuration
- `JwtUtil.java` - JWT token management

### Frontend:
- `auth.service.ts` - Authentication service
- `login.component.*` - Login form
- `register.component.*` - Registration form
- `auth.guard.ts` - Route protection
- `app.routes.ts` - Protected routes
- `header.component.*` - Auth UI

## 🎯 Problem Solved!

Your original problem: *"How can a customer buy if he/she doesn't have any accounts and the admin can only see the orders"*

**Solution**: 
- ✅ Customers can now register accounts
- ✅ Customers can login and place orders
- ✅ Admins can see all orders
- ✅ Customers can only see their own orders
- ✅ Secure authentication system

The application now has a complete user management system that allows customers to create accounts, login, and place orders, while giving admins full visibility into all orders!
