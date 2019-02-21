import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes declarados.
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule],
  exports: [AlertComponent]
})
export class AlertModule { }
