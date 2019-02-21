import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoID: number;

  comments$: Observable<Array<PhotoComment>>;

  commentForm: FormGroup;

  constructor(private photoService: PhotoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });

    /**
     * Recebe um 'Observable' que contém todos os comentários de uma foto.
     */
    this.comments$ = this.photoService.getComments(this.photoID);
  }

  save() {
    const comment = this.commentForm.controls['comment'].value as string;

    /**
     * Primeiro o novo comentário é adicionado na API, quando esta operação terminar
     * será realizado o 'switchMap' que irá trocar a execução do serviço para o método
     * 'getComments'.
     * Quando este método for executado, ele retornará um 'Observable' que contém
     * todos os comentários da foto.
     * Desta forma o @param comments$ é atualizado sempre que um novo comentário for
     * adicionado para a foto.
     * Antes de 'getComments' retornar um 'Observable' o operador @tap executa um
     * código arbitrário.
     */
    this.comments$ = this.photoService.addComment(this.photoID, comment)
        .pipe(switchMap(() => this.photoService.getComments(this.photoID)))
        .pipe(tap(() => {
          this.commentForm.reset();
          alert('Cometário adicionado com sucesso');
        }));
  }
}
