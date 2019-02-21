import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes declarados.
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';

// Diretivas declaradas.
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';

// Módulos importados.
import { PhotoModule } from '../photo/photo.module';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
  declarations: [
    PhotoDetailsComponent,
    PhotoCommentsComponent,
    PhotoOwnerOnlyDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PhotoModule,
    VMessageModule,
    ShowIfLoggedModule
  ],
  exports: [PhotoDetailsComponent, PhotoCommentsComponent]
})
export class PhotoDetailsModule { }
