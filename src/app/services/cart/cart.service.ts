import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environments.developer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private BASE_URL = signal(environment.apiUrl);
  private _http = inject(HttpClient);
    constructor() {}
  getCart(id: string): Observable<any> {
    return this._http.get(`${this.BASE_URL()}/cart/cartId/${id}`);}
}