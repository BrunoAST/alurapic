import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PhotoService } from '../photo/photo.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  percentDone = 0;

  constructor(
      private formBuilder: FormBuilder,
      private photoService: PhotoService,
      private router: Router,
      private alertService: AlertService,
      private userService: UserService
    ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    const description = this.photoForm.controls['description'].value;
    const allowComments = this.photoForm.controls['allowComments'].value;

    this.photoService.upload(description, allowComments, this.file)

        /**
         * Quando a operação finalizar, o usuário será redirecionado para a tela de 'user'.
         */
        .pipe(finalize(() => this.router.navigate(['/user', this.userService.getUserName()])))
        .subscribe((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {

            /**
             * Mostra o progresso do upload da imagem, o percetual enviado é arredondado para o número
             * inteiro mais próximo.
             */
            this.percentDone = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.alertService.success('Upload complete', true);
          }
        },
        err => {
          console.log(err);
          this.alertService.danger(`Upload erro: ${err}`);
        });
  }

  handleFile(file: File) {
    this.file = file;

    const reader = new FileReader();

    /**
     * O upload das imagens é feito de forma assíncrona. A função 'onload' executa por meio de callback,
     * ou seja, ela só será chamada quando o upload tiver sido concluído.
     * Quando o upload for concluído, a propriedade @preview recebe os dados da foto que foi carregada
     * no formato de URL.
     */
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
