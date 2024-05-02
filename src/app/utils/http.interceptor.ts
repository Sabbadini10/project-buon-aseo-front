import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Error de cliente
          console.error('Error de cliente:', error.error.message);
        } else {
          // Error de servidor
          if (typeof error.error === 'string') {
            try {
              // Intenta parsear la respuesta como JSON
              const errorJson = JSON.parse(error.error);
              console.error('Error de servidor:', errorJson);
            } catch (e) {
              // Si la respuesta no es un JSON válido, maneja el error aquí
              console.error('Respuesta no válida del servidor:', error.error);
            }
          } else {
            console.error('Error de servidor:', error.error);
          }
        }
        return throwError(error);
      })
    );
  }
}