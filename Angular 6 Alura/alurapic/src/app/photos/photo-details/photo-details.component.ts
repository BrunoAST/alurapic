import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoID: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private alertService: AlertService,
    private userService: UserService
    ) {}

  ngOnInit() {
    /**
    * Recupera o 'ID' da foto que está presente na URL.
    * Depois o serviço de 'photo' é chamado para que seja retornado a foto correspondente ao 'ID' pesquisado.
    */
    this.photoID = this.route.snapshot.params.photoID;

    this.photo$ = this.photoService.findByID(this.photoID);

    this.photo$.subscribe(() => {}, err => this.router.navigate(['not-found']));
  }

  remove() {
    this.photoService.removePhoto(this.photoID)
        .subscribe(() => {
          this.alertService.success('Photo removed', true);
          this.router.navigate(['/user', this.userService.getUserName()]);
        },
        err => this.alertService.danger(err, true));
  }

  like(photo: Photo) {
    this.photoService.like(photo.id)
        .subscribe(liked => {
          /**
           * Se a foto foi curtida, então é buscado esta mesma foto na API novamente
           * para trazer seus dados mais atualizados para os comentários e likes.
           */
          if (liked) {
            this.photo$ = this.photoService.findByID(photo.id);
          }
        });
  }
}
