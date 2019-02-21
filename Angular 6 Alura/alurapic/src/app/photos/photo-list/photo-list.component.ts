import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter = '';

  hasMore = true;
  currentPage = 1;
  userName = '';

  constructor(private activatedRoute: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit(): void {
    /**
     * Recupera o nome do usuário para ser utilizado posteriormente na paginação das fotos.
     */
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      /**
       * 'photos' recebe os dados vindos do resolver de PhotoListResolver, através dos valores
       * carregados para a foto pela propriedade 'photos'(Definido no componente de app.routing).
       */
    this.photos = this.activatedRoute.snapshot.data['photos'];
    });
  }

  load() {
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage)
    .subscribe(photosResponse => {
      /**
       * Spread Operator - faz com que cada objeto que está sendo recebido por photosResponse,
       * seja divido em endereços individuais dentro de array de pthotos.
       * this.photos.push(...photosResponse);
       */
      this.filter = '';
      this.photos = this.photos.concat(photosResponse);

      if (!photosResponse.length) {
        this.hasMore = false;
      }
    });
  }

}
