import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'app/dashboard/services/admin.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})

export class PostCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  loading: boolean = false; // To track loading state
  successMessage: string | null = null; // To store success message
  errorMessage: string | null = null; // To store error message

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],  // Form control name
    });
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      this.loading = true;  // Start loading spinner
      this.successMessage = null; // Clear previous success message
      this.errorMessage = null;   // Clear previous error message

      const categoryDTO = {
        categoryName: this.categoryForm.get('name')?.value,
      };

      this.adminService.addCategory(categoryDTO).subscribe(
        (res) => {
          console.log('Category added successfully:', res);
          this.loading = false; // Stop loading spinner
          this.successMessage = 'Category added successfully!';
          this.categoryForm.reset(); // Reset the form
        },
        (error) => {
          console.error('Error in addCategory:', error);
          this.loading = false; // Stop loading spinner
          this.errorMessage = 'Failed to add category. Please try again.';
        }
      );
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
