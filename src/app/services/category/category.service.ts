import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  /* http://localhost:3030/api/category/categoryList */
  private BASE_URL = signal(environment.apiUrl);
  private _http= inject(HttpClient);
  private router = inject(Router);
constructor() { }

getCategory(): Observable<any> {
  return this._http.get(`${this.BASE_URL()}/category/categoryList`);
}
}
