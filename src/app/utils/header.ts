import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  const windowObject = getWindow();
  const user = windowObject && windowObject.localStorage.getItem('currentUser');
  console.log(user)
  const currentUser = user ? JSON.parse(user) : null;

  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', currentUser?.token || '');

  console.log("este es el user " + JSON.stringify(currentUser));
  console.log("este es el header " + JSON.stringify(headers));

  return headers;
}

function getWindow(): Window | null {
  return typeof window !== 'undefined' ? window : null;
}
