import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: OrderItem[] = [];
  groupedOrders: OrderGroup[] = [];
  loading: boolean = true;
  error: string = '';
  isAdmin: boolean = false;
  showNotesDialog: boolean = false;
  adminNotes: string = '';
  currentOrderId: number | null = null;
  currentAction: string = '';
  customerNotes: string = '';
  editingCustomerNotes: number | null = null;

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
    this.currentOrderId = orderId;
    this.currentAction = 'ACCEPTED';
    this.adminNotes = '';
    this.showNotesDialog = true;
  }

  rejectOrder(orderId: number): void {
    this.currentOrderId = orderId;
    this.currentAction = 'REJECTED';
    this.adminNotes = '';
    this.showNotesDialog = true;
  }

  processOrder(orderId: number): void {
    this.currentOrderId = orderId;
    this.currentAction = 'PROCESSING';
    this.adminNotes = '';
    this.showNotesDialog = true;
  }

  submitAdminNotes(): void {
    if (this.currentAction === 'REJECTED' && !this.adminNotes.trim()) {
      alert('Admin notes are required when rejecting an order.');
      return;
    }

    if (this.currentOrderId !== null) {
      // If currentAction is empty, it means we're just replying (no status change)
      if (this.currentAction === '') {
        // Just update the admin notes without changing status
        const order = this.orders.find(o => o.id === this.currentOrderId);
        if (order) {
          order.adminNotes = this.adminNotes;
          order.lastUpdated = new Date().toISOString();
          this.orderService.updateOrder(this.currentOrderId, order).subscribe({
            next: () => {
              alert('Reply sent successfully!');
              this.closeNotesDialog();
              this.loadOrders();
            },
            error: (error) => {
              console.error('Error sending reply:', error);
              alert('Failed to send reply. Please try again.');
            }
          });
        }
      } else {
        // Update status + admin notes (existing functionality)
        this.orderService.updateOrderStatus(this.currentOrderId, this.currentAction, this.adminNotes).subscribe({
          next: () => {
            alert(`Order ${this.currentAction.toLowerCase()} successfully!`);
            this.closeNotesDialog();
            this.loadOrders();
          },
          error: (error) => {
            console.error('Error updating order:', error);
            alert('Failed to update order. Please try again.');
          }
        });
      }
    }
  }

  closeNotesDialog(): void {
    this.showNotesDialog = false;
    this.adminNotes = '';
    this.currentOrderId = null;
    this.currentAction = '';
  }

  // Customer notes methods
  startEditingCustomerNotes(order: OrderGroup): void {
    this.editingCustomerNotes = order.orderId;
    this.customerNotes = order.items[0].customerNotes || '';
  }

  saveCustomerNotes(order: OrderGroup): void {
    if (!order.items[0].id) return;

    this.orderService.updateCustomerNotes(order.items[0].id, this.customerNotes).subscribe({
      next: (updatedOrder) => {
        // Update all items in this order with the new customer notes
        order.items.forEach(item => {
          item.customerNotes = updatedOrder.customerNotes;
          item.lastUpdated = updatedOrder.lastUpdated;
        });
        this.editingCustomerNotes = null;
        alert('Your message has been sent!');
      },
      error: (error) => {
        console.error('Error updating customer notes:', error);
        alert('Failed to send message. Please try again.');
      }
    });
  }

  cancelEditingCustomerNotes(): void {
    this.editingCustomerNotes = null;
    this.customerNotes = '';
  }

  // Admin reply to customer message (without changing order status)
  replyToCustomer(order: OrderGroup): void {
    if (!order.items[0].id) return;
    
    this.currentOrderId = order.items[0].id;
    this.currentAction = ''; // No status change
    this.adminNotes = order.items[0].adminNotes || '';
    this.showNotesDialog = true;
  }
}

