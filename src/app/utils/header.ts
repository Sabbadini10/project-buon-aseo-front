import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  let user;
  try {
    user = JSON.parse(localStorage['currentUser']);
  } catch (error) {
    console.warn('Error parsing currentUser from localStorage:', error);
  }

  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  if (user && user.token) {
    headers.set('Authorization', user.token);
  }

  return headers;
}
