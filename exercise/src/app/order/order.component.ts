import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, OrderItem } from '../service/order.service';
import { PriceFormatService } from '../service/price-format.service';

interface OrderGroup {
  orderId: number;
  items: OrderItem[];
  customerName: string;
  created: string;
  total: number;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: OrderItem[] = [];
  groupedOrders: OrderGroup[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private orderService: OrderService,
    public priceFormatService: PriceFormatService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    // For demo, we'll load all orders (you can filter by customer later)
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.groupOrders();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.error = 'Failed to load orders. Please try again later.';
        this.loading = false;
      }
    });
  }

  groupOrders(): void {
    // Group orders by orderId
    const ordersMap = new Map<number, OrderItem[]>();
    
    this.orders.forEach(order => {
      if (!ordersMap.has(order.orderId)) {
        ordersMap.set(order.orderId, []);
      }
      ordersMap.get(order.orderId)?.push(order);
    });

    // Convert map to array and calculate totals
    this.groupedOrders = Array.from(ordersMap.entries()).map(([orderId, items]) => {
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return {
        orderId,
        items,
        customerName: items[0].customerName,
        created: items[0].created || '',
        total
      };
    }).sort((a, b) => b.orderId - a.orderId); // Sort by order ID descending (newest first)
  }

  getOrderTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getProductImage(imageFile: string): string {
    if (!imageFile || imageFile.trim() === '') {
      return 'assets/products/placeholder.jpg';
    }
    if (!imageFile.includes('.')) {
      imageFile = `${imageFile}.jpg`;
    }
    return `assets/products/${imageFile}`;
  }

  getStatusBadge(status: number | undefined): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Confirmed';
      case 2: return 'Cancelled';
      case 3: return 'Shipped';
      case 4: return 'Delivered';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: number | undefined): string {
    switch (status) {
      case 0: return 'status-pending';
      case 1: return 'status-confirmed';
      case 2: return 'status-cancelled';
      case 3: return 'status-shipped';
      case 4: return 'status-delivered';
      default: return 'status-unknown';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

