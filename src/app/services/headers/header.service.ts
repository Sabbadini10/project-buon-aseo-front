import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders().set('Accept', 'application/json');

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('currentUser');
      console.log(token);
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}