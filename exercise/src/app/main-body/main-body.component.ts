import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { PriceFormatService } from '../service/price-format.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-slide" [style.background-image]="'url(' + heroImages[currentImageIndex] + ')'">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>BEST BILLIARDS</h1>
          <h2>PRODUCTS</h2>
          <p>Shop the top value around</p>
          <div class="hero-buttons">
            <button class="btn btn-primary" routerLink="/product">View All Products</button>
            <button class="btn btn-primary" routerLink="/cart">View Cart</button>
          </div>
        </div>
      </div>
      
      <!-- Carousel Navigation -->
      <div class="carousel-arrows">
        <button class="arrow-left" (click)="prevImage(); onManualNavigation()">‹</button>
        <button class="arrow-right" (click)="nextImage(); onManualNavigation()">›</button>
      </div>
      
      <!-- Carousel Indicators -->
      <div class="carousel-indicators">
        <span 
          *ngFor="let image of heroImages; let i = index" 
          class="indicator" 
          [class.active]="i === currentImageIndex"
          (click)="goToSlide(i)">
        </span>
      </div>
    </section>

    <!-- Top Categories Section -->
    <section class="top-categories">
      <div class="container">
        <h2 class="section-title">TOP CATEGORIES</h2>
        <div class="categories-grid">
          <div class="category-card" routerLink="/product" [queryParams]="{category: 'Accessories'}">
            <img src="assets/products/pink.jpg" alt="Accessories" class="category-image">
            <div class="category-overlay">
              <h3>ACCESSORIES</h3>
            </div>
          </div>
          <div class="category-card" routerLink="/product" [queryParams]="{category: 'Pool Cues'}">
            <img src="assets/products/predator_black.jpg" alt="Pool Cues" class="category-image">
            <div class="category-overlay">
              <h3>POOL CUES</h3>
            </div>
          </div>
          <div class="category-card" routerLink="/product" [queryParams]="{category: 'Pool Tables'}">
            <img src="assets/products/black_table.jpg" alt="Pool Tables" class="category-image">
            <div class="category-overlay">
              <h3>POOL TABLES</h3>
            </div>
          </div>
        </div>
        <div class="view-all-container">
          <button class="btn-view-all" routerLink="/product">VIEW ALL PRODUCTS</button>
        </div>
      </div>
    </section>

  `,
  styles: [`
    /* Hero Section */
    .hero {
      position: relative;
      height: 70vh;
      min-height: 500px;
      overflow: hidden;
    }

    .hero-slide {
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      position: relative;
    }

    .hero-bg-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 2;
    }

    .carousel-indicators {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      z-index: 3;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: background 0.3s;
    }

    .indicator.active {
      background: white;
    }

    .carousel-arrows {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 3;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
    }

    .arrow-left, .arrow-right {
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .arrow-left:hover, .arrow-right:hover {
      background: #000000;
      transform: scale(1.1);
    }

    .hero-content {
      position: relative;
      z-index: 3;
      text-align: center;
      color: white;
      max-width: 800px;
      padding: 3rem 2rem;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 900;
      margin-bottom: 0.5rem;
      text-shadow: 3px 3px 6px rgba(0,0,0,0.8);
      letter-spacing: 2px;
    }

    .hero-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
      letter-spacing: 1px;
    }

    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    }

    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    }

    .btn-primary {
      background: #000000;
      color: white;
      border: 2px solid #000000;
    }

    .btn-primary:hover {
      background: #ffffff;
      color: #000000;
      border-color: #000000;
      transform: translateY(-2px);
    }

    /* Top Categories Section */
    .top-categories {
      background: white;
      padding: 4rem 0;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: #2c3e50;
      text-align: left;
      margin-bottom: 2rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .category-card {
      position: relative;
      height: 400px;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }

    .category-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .category-card:hover .category-image {
      transform: scale(1.1);
    }

    .category-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      padding: 2rem;
      display: flex;
      align-items: flex-end;
      height: 100%;
    }

    .category-overlay h3 {
      color: #A8D5E2;
      font-size: 2rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .view-all-container {
      text-align: center;
      margin-top: 3rem;
    }

    .btn-view-all {
      background: #2c3e50;
      color: white;
      padding: 1.2rem 3rem;
      border: none;
      border-radius: 50px;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
    }

    .btn-view-all:hover {
      background: #34495e;
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(44, 62, 80, 0.3);
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }
      
      .hero-content p {
        font-size: 1.2rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }

      .categories-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .category-card {
        height: 300px;
      }

      .section-title {
        font-size: 2rem;
        text-align: center;
      }
    }
  `]
})
export class MainBodyComponent implements OnInit, OnDestroy {
  currentImageIndex = 0;
  carouselInterval: any;
  autoSlideInterval = 6000; // 6 seconds between slides
  heroImages = [
    'assets/products/black_table.jpg',
    'assets/products/predator_black.jpg',
    'assets/products/raptor.jpg',
    'assets/products/predator_revo.jpg',
    'assets/products/grey.jpg'
  ];

  constructor(
    private productService: ProductService,
    public priceFormatService: PriceFormatService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.carouselInterval = setInterval(() => {
      this.nextImage();
    }, this.autoSlideInterval);
  }

  stopAutoSlide() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
  }

  prevImage() {
    this.currentImageIndex = this.currentImageIndex === 0 ? this.heroImages.length - 1 : this.currentImageIndex - 1;
  }

  goToSlide(index: number) {
    this.currentImageIndex = index;
    this.stopAutoSlide();
    setTimeout(() => this.startAutoSlide(), 2000); // Resume auto-slide after 2 seconds
  }

  onManualNavigation() {
    this.stopAutoSlide();
    setTimeout(() => this.startAutoSlide(), 3000); // Resume auto-slide after 3 seconds
  }
}