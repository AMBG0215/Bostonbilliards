import { Routes } from '@angular/router';
import { MainBodyComponent } from './main-body/main-body.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';

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
    component: CustomerComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
