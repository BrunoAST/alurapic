import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    /**
     * Se o usuário não estiver logado e tentar acessar algum componente que tenha esse guard, ele
     * será direcionado para 'home'.
     */
    if (!this.userService.isLogged()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
