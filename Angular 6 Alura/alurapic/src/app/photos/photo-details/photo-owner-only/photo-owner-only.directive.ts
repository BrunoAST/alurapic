import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

import { Photo } from '../../photo/photo';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
  selector: '[apPhotoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

  @Input() ownedPhoto: Photo;

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer,
    private userService: UserService
  ) { }

  /**
   * Só exibe o botão de excluir foto se o usuário logado for o proprietário da foto.
   */
  ngOnInit() {
    this.userService.getUser()
        .subscribe(user => {
          if (!user || user.id !== this.ownedPhoto.userId) {
            this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
          }
        });
  }
}
