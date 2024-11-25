import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/dashboard/services/admin.service';  // Adjust path accordingly

@Component({
  selector: 'app-get-all-products',
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.scss']
})
export class GetAllProductsComponent implements OnInit {
  
  products: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminService.getAllProducts().subscribe(
      (data) => {
        this.products = data; // Handle the products data
      },
      (error) => {
        console.error('Error loading products:', error); // Handle error
      }
    );
  }
}
