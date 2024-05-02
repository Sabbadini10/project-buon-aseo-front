import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  const user = JSON.parse(localStorage['currentUser'] ?? '{}');
  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  if (user && user.token) {
    headers.set('Authorization', user.token);
  }
  console.log(user)
  console.log(headers)
  return headers;
}
