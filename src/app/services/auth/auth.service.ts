import { Inject, inject, Injectable, isDevMode, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environment/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { getHeaders } from '../../utils/header';
import { User } from '../../interfaces/User';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { isPlatformBrowser } from '@angular/common';

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


  public login(email: string, password: string) {
    const headers = getHeaders();
    return this._http.post<any>(`${environment.apiUrl}/auth/signin`,{ email: email, password: password }, {headers})
      .pipe(map((user) => { localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }  

/* login(email: string, password: string): Observable<any> {
  const headers = getHeaders()
  return this._http.post<any>(`${environment.apiUrl}/auth/signin`, { email, password }, {headers});
} */
/* 
login(username: string, password: string) {
  const headers = getHeaders()
  return this._http.post<any>(`${environment.apiUrl}/auth/signin`, { email: username, password: password }, {headers})
    .pipe(
      map((user) => {
        const userss = localStorage.setItem("currentUser", JSON.stringify(user))        
        console.log(userss);
        this.currentUserSubject.next(user);
        return user;
      })
    );
} */

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
