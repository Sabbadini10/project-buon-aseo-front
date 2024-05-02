import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  let user = null;

  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage['currentUser'] || '{}');
  }

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  if (user && user.token) {
    headers.set('Authorization', user.token);
  }

  return headers;
}
