import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;

  // Recebe a referência do input de userName.
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private platformDetectorService: PlatformDetectorService,
      private router: Router
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });

    this.focusInput();
  }

  login() {
    event.preventDefault();
    const userName = this.loginForm.controls['userName'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.authenticate(userName, password)
      .subscribe(
        () => {
          // Navega para a URL 'localhost:3000/user/nomeDoUsuário'.
          // O parâmetro 'userName' é concatenado à rota.
          this.router.navigate(['user', userName]);
        },
        (err: HttpErrorResponse) => {
          this.loginForm.reset();
          alert(err.statusText);

          this.focusInput();
        }
      );
  }

  private focusInput() {
    // Só irá colocar foco no input de 'userName' se a aplicação estiver rodando em um browser.
    if (this.platformDetectorService.isPlatformBrowser()) {
      this.userNameInput.nativeElement.focus();
    }
  }
}
