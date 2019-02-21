import { Component, Input } from '@angular/core';

const CLOUD = 'http://localhost:3000/imgs/';

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {

  private _url = '';

  @Input() description: string;

  /**
  * Se a 'url' da imagem começar com 'data', então seu valor será concatenado com 'CLOUD url' para que a API
  * insira a foto no banco de dados.
  * Se a 'url' não iniciar com 'data', então seu valor já será inserido diretamente no banco de dados.
  */
  @Input() set url(url: string) {
    if (!url.startsWith('data')) {
      this._url = CLOUD + url;
    } else {
      this._url = url;
    }
  }

  get url(): string {
    return this._url;
  }
}
