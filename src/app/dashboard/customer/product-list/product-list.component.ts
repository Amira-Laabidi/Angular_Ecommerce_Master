import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/dashboard/services/customer.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];  // Use any[] instead of Product[]

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    // Fetch all products from the backend on component initialization
    this.customerService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;  // Store the fetched products in the array
      },
      error: (err) => {
        console.error('Error fetching products', err);  // Handle errors if the API request fails
      }
    });
  }

  addToCart(product: any): void {
    // Call the service to add the product to the cart
    this.customerService.addProductToCart(product).subscribe({
      next: () => {
        alert(`${product.name} added to cart`);  // Notify the user that the product was added to the cart
      },
      error: (err) => {
        console.error('Error adding product to cart', err);  // Handle errors if adding to the cart fails
      }
    });
  }
}
