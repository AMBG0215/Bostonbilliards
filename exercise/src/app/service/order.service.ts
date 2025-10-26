import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  created?: string;
  lastUpdated?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/order`;

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.apiUrl}/${id}`);
  }

  getOrdersByCustomerId(customerId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  createOrder(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(this.apiUrl, orderItem);
  }

  checkout(orderItems: OrderItem[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/checkout`, orderItems);
  }

  updateOrder(id: number, orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.apiUrl}/${id}`, orderItem);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

