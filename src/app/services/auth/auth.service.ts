import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { getHeaders } from '../../utils/header';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = signal(environment.apiUrl);
  /* private _http= inject(HttpClient); */
  private router = inject(Router)
constructor(private _http: HttpClient) { }

public login(user: any): Observable<any> {
  const headers = getHeaders();
  console.log(`${this.BASE_URL()}/auth/signin`);
  return this._http.post<any>(`${this.BASE_URL()}/auth/signin`, user)
    .pipe(
      catchError((error) => {
        console.log(error.message)
        console.error('Error al llamar a la API:', error);
        return throwError(error);
      })
    );
}
}
