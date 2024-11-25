import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'app/shared/auth/storage.service'; // Ensure the correct path

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (StorageService.hasToken()) {
      if (StorageService.isUserLoggedIn()) {
        // User is logged in as a regular user, allow access to user dashboard
        if (next.url[0].path === 'dashboard1') {
          this.router.navigateByUrl("/dashboard/dashboard2");
          return false;
        }
      } else if (StorageService.isAdminLoggedIn()) {
        // Admin is logged in, allow access to admin dashboard
        if (next.url[0].path === 'dashboard2') {
          this.router.navigateByUrl("/dashboard/dashboard1");
          return false;
        }
      }
    }
    
    return true; // Allow access if not logged in or to public pages
    
  }
}
