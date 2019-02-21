import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {
  @Input() photos: Photo[];
  rows: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // changes verifica se o input bound de photos sofreu alteração. Se tiver ocorrido, o método groupColumns serã executado,
    // divindo as photos em três elementos por linha.
    if (changes.photos) {
      this.rows = this.groupColumns(this.photos);
    }
  }

  groupColumns(photos: Photo[]) {
    const newRows = [];

    for (let i = 0; i < photos.length; i += 3) {
      // passa para o array um conjunto de fotos de 3 em 3.
      newRows.push(photos.slice(i, i + 3));
    }

    return newRows;
  }
}
