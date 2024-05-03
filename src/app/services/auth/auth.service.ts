import { inject, Injectable, isDevMode, signal } from '@angular/core';
import { environment } from '../../../environment/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
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
  this.currentUserSubject = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('currentUser') || '{}')
  );
  this.currentUser = this.currentUserSubject.asObservable();
}

private getWindow(): Window | null {
  return isDevMode() && typeof window === 'undefined' ? null : window;
}

public login(users: any) {
	return this._http.post<any>(`${environment.apiUrl}/auth/signin`,{ users })
		.pipe(map((user) => { localStorage.setItem("currentUser", JSON.stringify(user));
				this.currentUserSubject.next(user);
				return user;
			})
		);
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
