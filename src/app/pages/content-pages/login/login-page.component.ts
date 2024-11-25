import { Component } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'app/shared/auth/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm: FormGroup;
  loginFormSubmitted = false; // Used to track form submission status
  isLoginFailed = false; // Flag to check if login failed

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email field
      password: ['', [Validators.required]], // Password field
      rememberMe: [false]  // Checkbox for 'remember me' feature
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;  // Prevent form submission if form is invalid
    }

    const signinRequest = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value
    };

    this.authService.login(signinRequest).subscribe(
      (response) => {
        console.log('Login successful!');
        this.isLoginFailed = false; // Reset failed flag on success

        // Check if the user is an admin or a regular user and redirect accordingly
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('/dashboard/dashboard1');
        } else {
          this.router.navigateByUrl('/dashboard/dashboard2');
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.isLoginFailed = true; // Set failed flag to true
      }
    );
  }
}
