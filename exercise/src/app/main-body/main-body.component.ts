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
      background: rgba(45, 55, 72, 0.9);
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
      background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
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
      backdrop-filter: blur(2px);
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
      border: 2px solid transparent;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      text-decoration: none;
      display: inline-block;
      text-align: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.6s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
      color: white;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
      transform: translateY(-3px);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 25px rgba(45, 55, 72, 0.3), 0 0 20px rgba(255, 255, 255, 0.1);
    }

    .btn-primary:hover::before {
      left: 100%;
    }

    .btn-primary:active {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .btn-primary:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }

    /* Top Categories Section */
    .top-categories {
      background: white;
      padding: 4rem 0;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: #2d3748;
      text-align: left;
      margin-bottom: 2rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-shadow: 2px 2px 4px rgba(45, 55, 72, 0.1);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .category-card {
      position: relative;
      height: 450px;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      border: 3px solid transparent;
    }

    .category-card:hover {
      transform: translateY(-15px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0,0,0,0.25);
      border-color: #2d3748;
    }

    .category-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      filter: grayscale(20%) contrast(1.1);
    }

    .category-card:hover .category-image {
      transform: scale(1.05);
      filter: grayscale(0%) contrast(1.2);
    }

    .category-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), transparent);
      padding: 2.5rem 2rem 2rem;
      display: flex;
      align-items: flex-end;
      height: 100%;
      backdrop-filter: blur(0.5px);
    }

    .category-overlay h3 {
      color: #ffffff;
      font-size: 2.2rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin: 0;
      text-shadow: none;
      position: relative;
    }

    .category-overlay h3::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background: #ffffff;
      border-radius: 2px;
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
      background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
      color: white;
      padding: 1.5rem 4rem;
      border: 3px solid transparent;
      border-radius: 50px;
      font-weight: 800;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      text-transform: uppercase;
      letter-spacing: 2px;
      box-shadow: 0 8px 25px rgba(45, 55, 72, 0.3);
      position: relative;
      overflow: hidden;
    }

    .btn-view-all::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .btn-view-all:hover::before {
      left: 100%;
    }

    .btn-view-all:hover {
      background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 15px 35px rgba(45, 55, 72, 0.4);
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
        height: 350px;
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
  autoSlideInterval = 8000; // 8 seconds between slides
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