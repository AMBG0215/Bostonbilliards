import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface OrderItem {
  id?: number;
  orderId: number;
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  productDescription: string;
  productCategoryName: string;
  productImageFile: string;
  productUnitOfMeasure: string;
  quantity: number;
  price: number;
  status?: number;
  orderStatus?: string;
  adminNotes?: string;
  customerNotes?: string;
  created?: string;
  lastUpdated?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/order`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllOrders(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getOrderById(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getOrdersByCustomerId(customerId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/customer/${customerId}`, { headers: this.getAuthHeaders() });
  }

  getMyOrders(): Observable<OrderItem[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    return this.getOrdersByCustomerId(currentUser.userId);
  }

  createOrder(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(this.apiUrl, orderItem, { headers: this.getAuthHeaders() });
  }

  checkout(orderItems: OrderItem[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/checkout`, orderItems, { headers: this.getAuthHeaders() });
  }

  updateOrder(id: number, orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.apiUrl}/${id}`, orderItem, { headers: this.getAuthHeaders() });
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateOrderStatus(id: number, orderStatus: string, adminNotes: string): Observable<OrderItem> {
    const body = { orderStatus, adminNotes };
    return this.http.put<OrderItem>(`${this.apiUrl}/${id}/status`, body, { headers: this.getAuthHeaders() });
  }

  updateCustomerNotes(id: number, customerNotes: string): Observable<OrderItem> {
    const body = { customerNotes };
    return this.http.put<OrderItem>(`${this.apiUrl}/${id}/customer-notes`, body, { headers: this.getAuthHeaders() });
  }
}

