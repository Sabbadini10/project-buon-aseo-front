import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /* http://localhost:3030/api/users/usersList */
  private BASE_URL = signal(environment.apiUrl);
  private _http= inject(HttpClient);
  private router = inject(Router);
constructor() { }

getUsers(): Observable<any> {
  return this._http.get(`${this.BASE_URL()}/users/usersList`);
}

getUserTypes(): Observable<any> {
  return this._http.get<any>(`${this.BASE_URL()}/userTypes/userTypes-list`);
}
}
