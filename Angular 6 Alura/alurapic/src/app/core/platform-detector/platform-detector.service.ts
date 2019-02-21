import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PlatformDetectorService {

  // Injeta o token PLATFORM_ID para o atributo 'platformID'.
  constructor(@Inject(PLATFORM_ID) private platformID: string) {}

  // Identifica se está em um navegador.
  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformID);
  }
}
