import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/dashboard/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product = {
    name: '',
    description: '',
    unitPrice: null,
    unitsInStock: null,
    imageUrl: '',
    active: true,
    category: null,  // Assume categories will be handled separately
    productStatus: null  // Assume product status will be handled separately
  };

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    // Optional: Load categories or statuses from backend here if needed
  }

  // Handle form submission
  onSubmit(): void {
    this.adminService.addProduct(this.product).subscribe(
      (response) => {
        console.log('Product created:', response);
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }
}
