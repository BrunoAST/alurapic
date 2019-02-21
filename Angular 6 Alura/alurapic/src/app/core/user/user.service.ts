import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import * as jwt_decode from 'jwt-decode';

import { TokenService } from '../token/token.service';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  /**
   * @BehaviorSubject : Armazena o último valor emitido para que quem for utilizá-lo tenha acesso a este valor a qualquer
   * momento. Isto evita que um valor seja emitido antes de um componente ter sido iniciado, e quando este valor for neessário
   * neste componente, ele já foi emitido. Fazendo com que este componente não receba este valor, isto acontece
   * quando é utilizado o @Subject .
   */
  private userSubject = new BehaviorSubject<User>(null);

  private userName: string;

  constructor(private tokenService: TokenService) {
    /**
     * Sempre que o componente for iniciado, é verificado se existe um token na sessão, se existir,
     * este valor será decodificado e emitido via BehaviorSubject.
     */
    if (this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  getUserName(): string {
    return this.userName;
  }

  /**
   * Recebe o token da sessão atual, decodifica seus dados, armazenda em um Objeto do tipo 'User' e
   * emite o valor decodificado.
   */
  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;

    // Acessa o userName do token decodificado.
    this.userName = user.name;

    this.userSubject.next(user);
  }
}
