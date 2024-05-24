import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environments.developer';
import { UserRegister } from '../../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private BASE_URL = signal(environment.apiUrl);
  private _http = inject(HttpClient);
  constructor() {}

//http://localhost:3030/api/users/users/66294b01f65c3072bffcd23a

  getUsers(): Observable<any> {
    return this._http.get(`${this.BASE_URL()}/users/usersList`);
  }

  getUsersById(id: string): Observable<any> {
    return this._http.get(`${this.BASE_URL()}/users/users/${id}`);
  }

  postUsersById(id: string, body: UserRegister): Observable<any> {
    return this._http.put(`${this.BASE_URL()}/users/users/${id}`, body);
  }

  getUserTypes(): Observable<any> {
    return this._http.get<any>(`${this.BASE_URL()}/userTypes/userTypes-list`);
  }

  public mapRequiredValues(user: any) {
    const userInfo: any = {};
    userInfo.name = user.name;
    userInfo.email= user.email;
    userInfo.phone = user.phone;
    userInfo.password = user.password;
    userInfo.avatar = user.avatar;
    userInfo.nationality = user.nationality;
    userInfo.address = user.adress;
    userInfo.dni = user.dni;
    userInfo.city = user.city;
    userInfo.gender = user.gender;
    userInfo.birthday = user.birthday;
    userInfo.postal_code = user.postal_code;
    return userInfo;
  }
}
