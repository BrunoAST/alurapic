import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) {

  /**
   * Verifica se o valor passado para o input possui os padrões delimitados para aquele campo.
   */
  if (control.value && !/^[a-z0-9_\-]+$/.test(control.value)) {
    // O nome do objeto que é retornado será utilziado pelo template para realizar as validações.
    return { lowerCase: true };
  }
  return null;
}
