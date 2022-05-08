import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Subject, of } from 'rxjs';
import { StorageService } from '../core/storage/storage.service';
import { User } from '../users/user';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = '/auth';
  private tokenKey: string = 'token';
  private user?: User;
  user$: Subject<User> = new Subject();

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private userService: UserService
  ) { }

  /**
   * Authenticates the user with the given email and password.
   *
   * @param email
   * @param password
   * @returns Observable<string>
   */
  authenticate(email: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.url}/login`, {email, password}).pipe(
      map((response: any) => response?.data?.token)
    );
  }

  /**
   * Register a new user.
   *
   * @returns Observable<User>
   */
  register(name: string, email: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.url}/register`, {name, email, password}).pipe(
      map((response: any) => response?.data?.token)
    );
  }

  /**
   * Returns true if there's an active token for the user.
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Logs in the user.
   *
   * @param token
   */
  login(token: string): void {
    this.storage.setItem(this.tokenKey, token);
    this.initSession();
  }

  /**
   * Initializes the session of the user. Best called in the app.component.ts.
   */
  initSession(): void {
    if (this.user) {
      this.user$.next(this.user);
    } else {
      if (this.getToken()) {
        this.getUser().subscribe((user: User) => {
          this.user = user;
          this.user$.next(this.user);
        });
      }
    }
  }

  /**
   * Logs out the current user.
   */
  logout(): Observable<void> {
    return this.http.get<void>(`${this.url}/logout`);
  }

  /**
   * Clears the session of the user.
   */
  clearSession(): void {
    this.storage.clear();
  }

  /**
   * Returns the current access token or null if none.
   *
   * @returns string
   */
  getToken(): string|null {
    return this.storage.getItem(this.tokenKey);
  }

  /**
   * Returns the current authenticated user.
   *
   * @returns Observable<User>
   */
  getUser(): Observable<User> {
    return this.userService.getMe();
  }

  /**
   * Sends reset password link.
   */
  sendResetPassword(email: string): Observable<string> {
    return this.http.post<string>(`${this.url}/password/forgot`, { email })
  }

  /**
   * Reset password.
   */
  resetPassword(data: any): Observable<string> {
    return this.http.post<string>(`${this.url}/password/reset`, data);
  }
}
