import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  const user = JSON.parse(localStorage['currentUser']);
  const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', user.token);
  return headers;
}
