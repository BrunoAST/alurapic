import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) {}

  authenticate(userName: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${API_URL}/user/login`, {userName, password}, {observe: 'response'})
      // Antes de disponibilizar os dados para o componente, a operação do 'pipe' será executada.
      .pipe(tap((res: HttpResponse<any>) => {
        const authToken = res.headers.get('x-access-token');
        this.userService.setToken(authToken);
        console.log(`User ${userName} authencidated with token ${authToken}`);
      }));
  }
}
