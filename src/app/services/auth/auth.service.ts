import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { getHeaders } from '../../utils/header';
import { User } from '../../interfaces/User';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = signal(environment.apiUrl);
  private _http= inject(HttpClient);
  private router = inject(Router);
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: any;
constructor(@Inject(PLATFORM_ID) private platformId: Object) {

  let currentUser = null;
  if (isPlatformBrowser(this.platformId)) {
    currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  this.currentUserSubject = new BehaviorSubject<User>(currentUser);
  console.log(this.currentUserSubject)
  
  try {
    this.currentUser = JSON.parse(localStorage['currentUser']);
  } catch (error) {
    console.warn('Error parsing currentUser from localStorage:', error);
  }
}

getHeaders(): HttpHeaders {
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  if (this.currentUser && this.currentUser.token) {
    headers.set('Authorization', this.currentUser.token);
  }

  return headers;
}


public login(email: string, password: string): Observable<any> {
  const user = { email, password }
   const headers = this.getHeaders(); 
  console.log(`${this.BASE_URL()}/auth/signin`);
  return this._http.post<User>(`${this.BASE_URL()}/auth/signin`, {email, password}, {headers})
}

public get currentUserValue(): any {
  return this.currentUserSubject.value;
}

public setUserValue(body: any) {
  this.currentUserSubject.next(body);
}

logout() {
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(this.currentUserValue);
  return of({ success: false });
}
}
