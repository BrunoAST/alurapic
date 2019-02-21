import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpSentEvent,
  HttpRequest,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  /**
   * Toda vez que uma requisição for realizada, será verificado se o usuário tem permissão de acesso
   * através do seu token de autenticação.
   * Este token é enviado para o servidor toda vez que uma nova requisição for realizada, e o próprio
   * servidor verfica se o usuário tem permissão de acesso.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

      if (this.tokenService.hasToken()) {
        const token = this.tokenService.getToken();
        req = req.clone({
          setHeaders: {
            'x-access-token': token
          }
        });
      }

      return next.handle(req);
  }
}
