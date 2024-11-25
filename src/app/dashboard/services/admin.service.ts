import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'app/shared/auth/storage.service'; // Ensure this path is correct

const BASIC_URL = 'http://localhost:8084/productcategory'; // URL for categories
const PRODUCTS_URL = 'http://localhost:8084/product/products'; // URL for products

const PRODUCT_URL = 'http://localhost:8084/product';  // Updated URL to match the backend


@Injectable({
  providedIn: 'root',
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  // Method to add a new category
  addCategory(categoryDTO: any): Observable<any> {
    return this.http.post(BASIC_URL, categoryDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Method to get all categories
  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Method to delete a category by ID
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Method to get all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(PRODUCTS_URL, {
      headers: this.createAuthorizationHeader(),
    });
  }
 // Method to add a new product
 addProduct(productDTO: any): Observable<any> {
  return this.http.post(PRODUCT_URL, productDTO, {
    headers: this.createAuthorizationHeader(),
  });
}

  private createAuthorizationHeader(): HttpHeaders {
    const token = StorageService.getToken();  // Ensure this is correct
    console.log('Token:', token); // Debugging step to check if token is present
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }
}
