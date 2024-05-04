import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  const headers = new HttpHeaders().set('Accept', 'application/json');
  return headers;
}
 
