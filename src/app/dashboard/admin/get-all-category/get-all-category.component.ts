import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/dashboard/services/admin.service';

@Component({
  selector: 'app-get-all-category',
  templateUrl: './get-all-category.component.html',
  styleUrls: ['./get-all-category.component.scss']
})
export class GetAllCategoryComponent implements OnInit {

  categories: any[] = [];  // Store all categories
  filteredCategories: any[] = [];  // Store filtered categories based on search query
  searchQuery: string = '';  // For search input
  currentPage: number = 1;  // Pagination current page
  totalPages: number = 1;  // Total number of pages
  itemsPerPage: number = 10; // Number of items per page
  errorMessage: string;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.adminService.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
      this.filteredCategories = data;  // Initially, no filter is applied
      this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);  // Calculate total pages
      this.updatePage();  // Update the view based on pagination
    });
  }

  // Search categories based on input query
  searchCategories(): void {
    if (this.searchQuery) {
      this.filteredCategories = this.categories.filter(category =>
        category.categoryName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCategories = this.categories;  // No filter applied
    }
    this.totalPages = Math.ceil(this.filteredCategories.length / this.itemsPerPage); // Recalculate pages after filtering
    this.currentPage = 1;  // Reset to first page after search
    this.updatePage();
  }

  // Sorting logic
  sortTable(property: string): void {
    this.filteredCategories.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  }

  // Pagination: Next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  // Pagination: Previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  // Update table data based on current page
  updatePage(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.filteredCategories = this.categories.slice(start, end);
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.adminService.deleteCategory(categoryId).subscribe(
        () => {
          this.categories = this.categories.filter(c => c.id !== categoryId);
          console.log('Category deleted successfully');
        },
        (error) => {
          console.error('Error deleting category:', error);
          this.errorMessage = 'Failed to delete category. Please try again later.';
        }
      );
    }
  }



  editCategory(id: number): void {
    // Implement edit functionality here
    console.log('Edit category with id:', id);
  }
}
