import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { NewUser } from './new-user';

import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable()
export class SignupService {

  constructor(private http: HttpClient) { }

  checkUserNameTaken(userName: string): Observable<boolean> {
    return this.http.get<boolean>(`${API}/user/exists/${userName}`);
  }

  singup(newUser: NewUser) {
    return this.http.post(`${API}/user/signup`, newUser);
  }
}
