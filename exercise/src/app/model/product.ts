export class Product {
  id: number = 0;
  name: string = '';
  description: string = '';
  categoryName?: string = '';        
  imageFile?: string = '';
  price: number = 0;
  originalPrice?: number;
  unitOfMeasure?: string = "";
  image: string = '';
  images?: string[];
  category: string = '';
  rating: number = 0;
  reviews: number = 0;
  inStock: boolean = true;
  brand: string = '';
}