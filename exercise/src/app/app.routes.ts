import { Routes } from '@angular/router';
import { MainBodyComponent } from './main-body/main-body.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainBodyComponent
  },
  {
    path: 'home',
    component: MainBodyComponent
  },
  {
    path: 'product',
    component: ProductCategoryComponent
  },
  {
    path: 'category/:id',
    component: ProductCategoryComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: OrderComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
