import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { PriceFormatService } from '../service/price-format.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  public allProducts: Product[] = [];
  public filteredProducts: Product[] = [];
  public selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    public priceFormatService: PriceFormatService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    // Fetch products from backend API
    this.productService.getData().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.filterProducts();
        console.log('Products loaded:', this.allProducts.length);
        console.log('Category filter:', this.selectedCategory);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        // Show fallback data if API fails
        this.loadFallbackData();
      }
    });
  }

  loadFallbackData(): void {
    console.warn('Using fallback data - backend may not be running');
    this.allProducts = [
      {
        id: 1,
        name: 'Cuetec Cynergy Truewood II Ebony 12.5mm - Leather Wrap',
        description: 'A+ grade kiln-dried Canadian Maple Core',
        categoryName: 'Pool Cues',
        imageFile: 'cuetec_synergy.jpg',
        price: 33799.00,
        unitOfMeasure: 'piece',
        image: 'assets/products/cuetec_cynergy.jpg',
        category: 'Pool Cues',
        rating: 5,
        reviews: 0,
        inStock: true,
        brand: 'Cuetec'
      },
      {
        id: 2,
        name: 'Predator SP4 Black/Blue No Wrap Pool Cue',
        description: 'Micarta Joint Collar and Butt Cap',
        categoryName: 'Pool Cues',
        imageFile: 'predator_black.jpg',
        price: 7999.00,
        unitOfMeasure: 'piece',
        image: 'assets/products/predator_black.jpg',
        category: 'Pool Cues',
        rating: 4,
        reviews: 0,
        inStock: true,
        brand: 'Predator'
      }
    ];
    this.filterProducts();
  }

  filterProducts(): void {
    if (!this.selectedCategory) {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(product =>
        product.categoryName === this.selectedCategory
      );
    }
  }

  getProductImage(imageFile: string | null | undefined): string {
    // If imageFile is null, undefined, or empty, use placeholder
    if (!imageFile || imageFile.trim() === '') {
      return 'assets/products/placeholder.jpg';
    }
    
    // If imageFile doesn't have extension, add .jpg
    if (!imageFile.includes('.')) {
      imageFile = `${imageFile}.jpg`;
    }
    
    return `assets/products/${imageFile}`;
  }

  handleImageError(event: any): void {
    console.warn('Image failed to load:', event.target.src);
    event.target.src = 'assets/products/placeholder.jpg';
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  }
}