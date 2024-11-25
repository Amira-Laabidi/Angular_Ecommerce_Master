import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { ReactiveFormsModule } from '@angular/forms'; // <-- Ensure ReactiveFormsModule is imported

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { PostCategoryComponent } from './admin/post-category/post-category.component';
import { GetAllCategoryComponent } from './admin/get-all-category/get-all-category.component';
import { FormsModule } from '@angular/forms';
import { GetAllProductsComponent } from './admin/get-all-products/get-all-products.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { CartComponent } from './customer/cart/cart.component';
import { CartItemsComponent } from './customer/cart-items/cart-items.component';
import { ProductListComponent } from './customer/product-list/product-list.component';
import { ProductDetailComponent } from './customer/product-detail/product-detail.component'; // Import FormsModule

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgApexchartsModule,
        AngularResizedEventModule,
        ReactiveFormsModule, 
        FormsModule// <-- Add ReactiveFormsModule here
    ],
    exports: [
        PostCategoryComponent
    ],
    declarations: [
        Dashboard1Component,
        Dashboard2Component,
        PostCategoryComponent,
        GetAllCategoryComponent,
        GetAllProductsComponent,
        AddProductComponent,
        CartComponent,
        CartItemsComponent,
        ProductListComponent,
        ProductDetailComponent
    ],
    providers: [],
})
export class DashboardModule { }
