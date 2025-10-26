import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, OrderItem } from '../service/order.service';
import { PriceFormatService } from '../service/price-format.service';
import { AuthService } from '../service/auth.service';

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
  isAdmin: boolean = false;

  constructor(
    private orderService: OrderService,
    public priceFormatService: PriceFormatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadOrders();
  }

  loadOrders(): void {
    if (this.isAdmin) {
      // Admin sees all orders
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
    } else {
      // Customer sees only their orders
      this.orderService.getMyOrders().subscribe({
        next: (orders) => {
          this.orders = orders;
          this.groupOrders();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading orders:', error);
          this.error = 'Failed to load your orders. Please try again later.';
          this.loading = false;
        }
      });
    }
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

  getStatusBadge(orderStatus: string | undefined, status: number | undefined): string {
    // Use new orderStatus if available, otherwise fall back to old status
    if (orderStatus) {
      switch (orderStatus.toUpperCase()) {
        case 'PENDING': return 'Pending';
        case 'ACCEPTED': return 'Accepted';
        case 'REJECTED': return 'Rejected';
        case 'PROCESSING': return 'Processing';
        case 'SHIPPED': return 'Shipped';
        case 'DELIVERED': return 'Delivered';
        default: return orderStatus;
      }
    }
    
    // Fallback to old status system
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Confirmed';
      case 2: return 'Cancelled';
      case 3: return 'Shipped';
      case 4: return 'Delivered';
      default: return 'Unknown';
    }
  }

  getStatusClass(orderStatus: string | undefined, status: number | undefined): string {
    // Use new orderStatus if available, otherwise fall back to old status
    if (orderStatus) {
      switch (orderStatus.toUpperCase()) {
        case 'PENDING': return 'status-pending';
        case 'ACCEPTED': return 'status-accepted';
        case 'REJECTED': return 'status-rejected';
        case 'PROCESSING': return 'status-processing';
        case 'SHIPPED': return 'status-shipped';
        case 'DELIVERED': return 'status-delivered';
        default: return 'status-unknown';
      }
    }
    
    // Fallback to old status system
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

  // Admin order management methods
  acceptOrder(orderId: number): void {
    const adminNotes = prompt('Add admin notes (optional):') || '';
    this.orderService.updateOrderStatus(orderId, 'ACCEPTED', adminNotes).subscribe({
      next: () => {
        alert('Order accepted successfully!');
        this.loadOrders(); // Reload orders to show updated status
      },
      error: (error) => {
        console.error('Error accepting order:', error);
        alert('Failed to accept order. Please try again.');
      }
    });
  }

  rejectOrder(orderId: number): void {
    const adminNotes = prompt('Add admin notes (required for rejection):') || '';
    if (!adminNotes.trim()) {
      alert('Admin notes are required when rejecting an order.');
      return;
    }
    
    this.orderService.updateOrderStatus(orderId, 'REJECTED', adminNotes).subscribe({
      next: () => {
        alert('Order rejected successfully!');
        this.loadOrders(); // Reload orders to show updated status
      },
      error: (error) => {
        console.error('Error rejecting order:', error);
        alert('Failed to reject order. Please try again.');
      }
    });
  }

  processOrder(orderId: number): void {
    const adminNotes = prompt('Add admin notes (optional):') || '';
    this.orderService.updateOrderStatus(orderId, 'PROCESSING', adminNotes).subscribe({
      next: () => {
        alert('Order marked as processing!');
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error updating order:', error);
        alert('Failed to update order. Please try again.');
      }
    });
  }
}

