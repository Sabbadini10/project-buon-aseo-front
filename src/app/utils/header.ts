import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  const user = localStorage.getItem('currentUser')
  const currentUser = JSON.parse(user!);
  const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', currentUser!.token);
  console.log("este es el user " + JSON.stringify(currentUser));
  console.log("este es el header " + JSON.stringify(headers));
  return headers;
}
