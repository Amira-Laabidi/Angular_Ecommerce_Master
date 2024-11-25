import { Injectable } from '@angular/core';

const USER = 'c_user';
const TOKEN = 'c_token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Save user info
  public saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  // Save token
  public saveToken(token: string) {
    console.log('Saving token', token);
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  // Retrieve token
  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  // Check if a token exists
  static hasToken(): boolean {
    return this.getToken() != null;
  }

  // Retrieve user info
  static getUser(): any | null {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  // Retrieve user role
  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : ''; // Assuming `role` exists in the user object
  }

  // Check if an admin is logged in
  static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  // Check if a regular user is logged in
  static isUserLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'USER';
  }

  // Logout user by removing token and user info from local storage
  static logout() {
    window.localStorage.removeItem(TOKEN); // Remove the token
    window.localStorage.removeItem(USER);  // Remove user information
  }
}
