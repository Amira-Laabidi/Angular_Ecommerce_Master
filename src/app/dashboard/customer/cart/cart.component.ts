import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/dashboard/services/customer.service';  // Assuming cart service exists

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  cartItems = [];
  totalPrice = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
   /* this.customerService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.calculateTotal();
    });
  }

  removeFromCart(item) {
    this.customerService.removeItemFromCart(item).subscribe(() => {
      this.cartItems = this.cartItems.filter(i => i !== item);
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.productPrice * item.productQuantity, 0);*/
  }
}
