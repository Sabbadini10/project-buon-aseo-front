import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private BASE_URL = signal(environment.apiUrl);
  private _http = inject(HttpClient);
  private router = inject(Router);
  constructor() {}

  getProducts(page: number, limit: number): Observable<any> {
    return this._http.get(
      `${this.BASE_URL()}/product/productList?page=${page}&limit=${limit}`
    );
  }
}
