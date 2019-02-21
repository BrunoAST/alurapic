import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { SignupService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private signupService: SignupService) { }

  checkUserNameTaken() {
    return (control: AbstractControl) => {
      /**
       * @SwitchMap : Troca o pipe que está sendo executado, após os 300ms terem sido alcançados pelo @debounceTime
       * o operador 'SwitchMap' irá executar a função presente em seu escopo.
       * @userName (parâmetro do segundo pipe): valor vindo do 'control', este valor é passado para chekUserNameTaken
       * retornando um valor booleano.
       */
       return control.valueChanges
              .pipe(debounceTime(300))
              .pipe(switchMap(userName => this.signupService.checkUserNameTaken(userName)
              ))
              .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
              .pipe(first());
    };
  }
}
