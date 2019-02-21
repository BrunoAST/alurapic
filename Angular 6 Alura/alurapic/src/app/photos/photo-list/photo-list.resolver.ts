import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

/**
 * Resolver que será utilizado para carregar as fotos de um usuário.
 * Fazendo isso, quando a rota de fotos for acessada (Ex: user/bruno),
 * as fotos já estarão carregadas para o componente de fotos.
 */
@Injectable({ providedIn : 'root' })
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {

  constructor(private photoService: PhotoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userName = route.params.userName;

    // Retorna para o usuário suas 12 primeiras fotos.
    return this.photoService.listFromUserPaginated(userName, 1);
  }
}
