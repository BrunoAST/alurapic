import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

    // Recebe a referência do input de userName.
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
      private formBuilder: FormBuilder,
      private userNotTakenValidatorService: UserNotTakenValidatorService,
      private signupService: SignupService,
      private router: Router,
      private platformDetectorService: PlatformDetectorService
    ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      fullName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      userName: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        lowerCaseValidator
        ],
        // Validador assíncrono.
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
    });

    this.focusInput();
  }

  signup() {
    /**
    * @getRawValue : retorna cada campo do formulário com os valores digitados pelo usuário.
    */
    const newUser: NewUser = this.signupForm.getRawValue() as NewUser;
    this.signupService.singup(newUser)
        .subscribe(() => this.router.navigate(['']),
                   err => console.log(err));
  }

  private focusInput() {
    // Só irá colocar foco no input de 'userName' se a aplicação estiver rodando em um browser.
    if (this.platformDetectorService.isPlatformBrowser()) {
      this.emailInput.nativeElement.focus();
    }
  }
}
