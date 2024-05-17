import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environments.developer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private BASE_URL = signal(environment.apiUrl);
  private _http = inject(HttpClient);
  constructor() {}

  getUsers(): Observable<any> {
    return this._http.get(`${this.BASE_URL()}/users/usersList`);
  }

  getUserTypes(): Observable<any> {
    return this._http.get<any>(`${this.BASE_URL()}/userTypes/userTypes-list`);
  }
}
