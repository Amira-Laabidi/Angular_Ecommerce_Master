import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'app/shared/auth/storage.service';  // Ensure this is correctly imported

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8084/product';  // URL of your Spring Boot API

  constructor(private http: HttpClient) {}

  // Create the Authorization header with the Bearer token
  private createAuthorizationHeader(): HttpHeaders {
    const token = StorageService.getToken();  // Retrieve token from StorageService
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  // Get all products with Authorization header
  getAllProducts(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.apiUrl}/products`, { headers });
  }

  // Get product details by ID with Authorization header
  getProductById(productId: string): Observable<any> {  // 'any' type can be replaced by a model if needed
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/products/${productId}`, { headers });  // Make sure your endpoint matches
  }

  // Add product to the cart with Authorization header
  addProductToCart(product: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}/addToCart`, product, { headers });
  }
}
