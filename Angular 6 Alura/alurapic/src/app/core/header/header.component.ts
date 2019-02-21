import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  // Notação para atibutos que armazenam dados de um Observable.
  user$: Observable<User>;

  constructor(private userService: UserService, private router: Router) {
    /**
     * Se inscreve no BehaviorSubject de 'UserService' para ter acesso aos dados decodificados do usuário
     * da sessão atual.
     */
    this.user$ = userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
