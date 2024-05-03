import { inject, Injectable, isDevMode, signal } from '@angular/core';
import { environment } from '../../../environment/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { getHeaders } from '../../utils/header';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = signal(environment.apiUrl);
  private _http= inject(HttpClient);
  private router = inject(Router);
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
constructor() {
  const windowObject = this.getWindow();
    const user = windowObject && windowObject.localStorage.getItem('currentUser')
      ? JSON.parse(windowObject.localStorage.getItem('currentUser') || '{}')
      : {};
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();
}

private getWindow(): Window | null {
  return isDevMode() && typeof window === 'undefined' ? null : window;
}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

public login(user: any): Observable<any> {
  console.log(user)
   const headers = getHeaders(); 
   console.log(headers)
  console.log(`${this.BASE_URL()}/auth/signin`);
  return this._http.post<User>(`${this.BASE_URL()}/auth/signin`, user, {headers})
}
/* 
public get currentUserValue(): any {
  return this.currentUserSubject.value;
}

public setUserValue(body: any) {
  this.currentUserSubject.next(body);
} */

logout() {
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(this.currentUserValue);
  return of({ success: false });
} 
}
