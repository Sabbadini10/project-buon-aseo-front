import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environments.production';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { getHeaders } from '../../utils/header';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = signal(environment.apiUrl);
  private _http = inject(HttpClient);
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    const users = localStorage.getItem('currentUser') || '{}';
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(users));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(email: string, password: string) {
    const headers = getHeaders();
    return this._http
      .post<any>(
        `${this.BASE_URL()}/auth/signin`,
        { email, password },
        { headers }
      )
      .pipe(map((currentUser) => this.setUser(currentUser)));
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

  private setUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;
  }
}
