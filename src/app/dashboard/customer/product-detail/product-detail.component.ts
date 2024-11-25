import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'app/dashboard/services/customer.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;  // Use 'any' for simplicity, can be typed if needed

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.customerService.getProductById(productId).subscribe(data => {
      this.product = data;
    });
  }

  addToCart(product: any) {
    // Add product to cart logic
    alert(`${product.name} added to cart`);
  }
}
