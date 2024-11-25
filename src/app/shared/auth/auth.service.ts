import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { StorageService } from './storage.service';
import { catchError, map, tap } from 'rxjs/operators';

const BASIC_URL = 'http://localhost:8084';
export const AUTH_HEADER = 'Authorization';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  // Login method
  login(signinRequest: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}/api/v1/auth/signin`, signinRequest, { observe: 'response' })
      .pipe(
        tap(_ => this.log('User Authentication')),
        map((res: HttpResponse<any>) => {
          // Save user info
          this.storage.saveUser(res.body);
          // Extract token from the Authorization header
          const token = res.headers.get(AUTH_HEADER);
          if (token) {
            const bearerToken = token.substring(7); // Remove "Bearer " prefix
            this.storage.saveToken(bearerToken);
          }
          return res;
        }),
        catchError(this.handleError)
      );
  }

  log(message: string) {
    console.log(message);
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Unauthorized access';
    }
    return throwError(() => new Error(errorMessage));
  }

  // Check if the user is authenticated by checking if a token exists
  isAuthenticated(): boolean {
    return StorageService.hasToken();
  }
}
