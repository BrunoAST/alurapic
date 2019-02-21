import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Component({
  selector: 'ap-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  user$: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user$ = this.userService.getUser();
  }
}
