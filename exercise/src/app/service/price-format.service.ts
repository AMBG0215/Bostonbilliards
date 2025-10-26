import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceFormatService {

  constructor() { }

  formatPrice(price: string | number): string {
    if (!price) return '₱0.00';

    let cleanPrice = typeof price === 'string' ? price.replace(/,/g, '') : price.toString();
    const numericPrice = parseFloat(cleanPrice);

    if (isNaN(numericPrice)) return '₱0.00';

    return `₱${numericPrice.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
}