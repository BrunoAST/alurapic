import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  listFromUser(userName: string): Observable<Photo[]> {
      return this.http.get<Photo[]>(`${API}/${userName}/photos`);
  }

  // Método que irá realizar paginação nas fotos de um usuário,
  // retornando uma quantidade específica de fotos por página
  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString());
    return this.http.get<Photo[]>(`${API}/${userName}/photos`, { params });
  }

  upload(description: string, allowComments: boolean, file: File): Observable<any> {
    /**
     * Quando há um arquivo que deve ser enviado para a API, é necessário fazer o envio das informações
     * através de um formData.
     * O nome de cada propriedade no 'append' deve estar de acordo com os nomes definidos na API.
     */
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post<any>(`${API}/photos/upload`, formData, { observe: 'events', reportProgress: true });
  }

  findByID(photoID: number): Observable<Photo> {
    return this.http.get<Photo>(`${API}/photos/${photoID}`);
  }

  getComments(photoID: number): Observable<Array<PhotoComment>> {
    return this.http.get<PhotoComment[]>(`${API}/photos/${photoID}/comments`);
  }

  addComment(photoID: number, commentText: string): Observable<any> {
    return this.http.post(`${API}/photos/${photoID}/comments`, { commentText });
  }

  removePhoto(photoID: number): Observable<any> {
    return this.http.delete(`${API}/photos/${photoID}`);
  }

  like(photoID: number): Observable<boolean> {

    /**
     * Após a requisição ser executada, será feito um 'pipe' com o operador 'map'.
     * Independente do resultado, este 'map' irá retornar 'true' porque neste caso a operação
     * foi bem sucedida.
     * Caso aconteça algum erro, o 'pipe' com o operador 'catchError' será executado.
     * Neste operador é verificado o status do error, se for o erro '304' então será
     * retornado um 'Observable' do tipo 'boolean' com o valor 'false' (o operador 'of'
     * que faz o retorno da resposta ser um 'Observable').
     * Este erro '304' quer dizer que a foto já foi curtida pelo usuário corrente, e neste caso
     * ele não pode curtir a foto mais de uma vez, daí o retorno deste código.
     * Caso o erro seja diferente de '304' então o erro será lançado através do operador 'throwError'.
     */
    return this.http.post(`${API}/photos/${photoID}/like`, {}, { observe: 'response' })
        .pipe(map(res => true))
        .pipe(catchError(err => {
          return err.status === 304 ? of(false) : throwError(err);
        }));
  }
}
