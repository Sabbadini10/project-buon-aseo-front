import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  const user = localStorage.getItem('currentUser')
  const currentUser = JSON.parse(user!);
  const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', currentUser.token);
  console.log("este es el user" + currentUser)
  console.log("este es el header" + headers)
  return headers;
}
