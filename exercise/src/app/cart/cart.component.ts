import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../model/product';
import { PriceFormatService } from '../service/price-format.service';
import { CartService, CartItem } from '../service/cart.service';
import { OrderService, OrderItem } from '../service/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  // Checkout form data
  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';
  customerAddress: string = '';
  showCheckoutForm: boolean = false;

  constructor(
    public priceFormatService: PriceFormatService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item.product.id);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item.product.id);
  }

  removeItem(item: CartItem): void {
    if (confirm(`Remove ${item.product.name} from cart?`)) {
      this.cartService.removeFromCart(item.product.id);
    }
  }

  getItemTotal(item: CartItem): string {
    const price = this.parsePrice(item.product.price);
    return (price * item.quantity).toFixed(2);
  }

  getSubtotal(): string {
    return this.subtotal.toFixed(2);
  }

  getTax(): string {
    return this.tax.toFixed(2);
  }

  getTotal(): string {
    return this.total.toFixed(2);
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getSubtotal();
    this.tax = this.cartService.getTax();
    this.total = this.cartService.getTotal();
  }

  getProductImage(imageFile: string | null | undefined): string {
    if (!imageFile || imageFile.trim() === '') {
      return 'assets/products/placeholder.jpg';
    }
    if (!imageFile.includes('.')) {
      imageFile = `${imageFile}.jpg`;
    }
    return `assets/products/${imageFile}`;
  }

  private parsePrice(price: string | number): number {
    if (typeof price === 'number') {
      return price;
    }
    return parseFloat(price.replace(/,/g, ''));
  }

  proceedToCheckout(): void {
    this.showCheckoutForm = true;
  }

  cancelCheckout(): void {
    this.showCheckoutForm = false;
  }

  submitOrder(): void {
    if (!this.customerName || !this.customerEmail) {
      alert('Please fill in all required fields (Name and Email)');
      return;
    }

    // For simplicity, using customer ID 1 (you can implement proper customer management later)
    const customerId = 1;

    // Convert cart items to order items
    const orderItems: OrderItem[] = this.cartItems.map(item => ({
      orderId: 0, // Will be set by backend
      customerId: customerId,
      customerName: this.customerName,
      productId: item.product.id,
      productName: item.product.name,
      productDescription: item.product.description || '',
      productCategoryName: item.product.categoryName || '',
      productImageFile: item.product.imageFile || '',
      productUnitOfMeasure: item.product.unitOfMeasure || '',
      quantity: item.quantity,
      price: this.parsePrice(item.product.price),
      status: 1
    }));

    // Submit order to backend
    this.orderService.checkout(orderItems).subscribe({
      next: (orderId) => {
        alert(`Order #${orderId} placed successfully! Total: ₱${this.getTotal()}`);
        this.cartService.clearCart();
        this.showCheckoutForm = false;
        this.resetForm();
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      }
    });
  }

  private resetForm(): void {
    this.customerName = '';
    this.customerEmail = '';
    this.customerPhone = '';
    this.customerAddress = '';
  }
}