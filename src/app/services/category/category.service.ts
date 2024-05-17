import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environments.developer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private BASE_URL = signal(environment.apiUrl);
  private _http = inject(HttpClient);
  constructor() {}

  getCategory(): Observable<any> {
    return this._http.get(`${this.BASE_URL()}/category/categoryList`);
  }
}
