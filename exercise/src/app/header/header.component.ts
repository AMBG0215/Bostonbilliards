import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { AuthService, User } from '../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartCount = 0;
  searchQuery = '';
  isCategoryDropdownOpen = false;
  showProductsDropdown = false;
  currentUser: User | null = null;
  selectedCategory: string = 'All';

  categories = [
    { name: 'Pool Cues' },
    { name: 'Pool Tables' },
    { name: 'Billiard Balls' },
    { name: 'Accessories' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = this.cartService.getCartCount();
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleCategoryDropdown() {
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  }

  closeCategoryDropdown() {
    this.isCategoryDropdownOpen = false;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.closeCategoryDropdown();
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  isActiveCategory(category: string): boolean {
    const currentUrl = this.router.url;
    const currentParams = this.route.snapshot.queryParams;
    return currentUrl.includes('/product') && currentParams['category'] === category;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      // Navigate to product page with search query
      const queryParams: any = { search: this.searchQuery.trim() };
      
      // If a category is selected (not 'All'), include it in the query
      if (this.selectedCategory && this.selectedCategory !== 'All') {
        queryParams.category = this.selectedCategory;
      }
      
      this.router.navigate(['/product'], { queryParams });
      this.searchQuery = ''; // Clear search after searching
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}