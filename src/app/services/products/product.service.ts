import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environments.developer';
import { Product } from '../../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private BASE_URL = signal(environment.apiUrl);
  private _http = inject(HttpClient);
  constructor() {}

//http://localhost:3030/api/product/productId/663bda97619dced926552c8e

  getProducts(page: number, limit: number): Observable<any> {
    return this._http.get(
      `${this.BASE_URL()}/product/productList?page=${page}&limit=${limit}`
    );
  }

  getProductsId(id: string): Observable<any> {
    return this._http.get(
      `${this.BASE_URL()}/product/productId/${id}`
    );
  }

  addProducts(body: Product[]): Observable<any> {
    return this._http.post(`${this.BASE_URL()}/product/productId`, body);
  }
  editProducts(id: string, body: Product[]): Observable<any> {
    return this._http.post(`${this.BASE_URL()}/product/productId${id}`, body);
  }

  public mapRequiredValues(product: any) {
    const productInfo: any = {};
    productInfo.name = product.name;
    productInfo.lastName = product.price;
    productInfo.city = product.city;
    productInfo.country = product.country;
    productInfo.birthday = product.birthday;
    productInfo.email = product.email;
    productInfo.phoneNumber = product.phoneNumber;
    productInfo.roles = product.roles;

    return productInfo;
  }
}
