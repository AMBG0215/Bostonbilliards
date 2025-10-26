import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/product`;

  constructor(private http: HttpClient) { }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}