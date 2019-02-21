import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';

// Rotas de Home (Lazy loading).
import { HomeRoutingModule } from './home.routing.module';

// Módulos utilizados.
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';

// Serviços utilizados pelo módulo.
import { SignupService } from './signup/signup.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    VMessageModule,
    HomeRoutingModule
  ],
  declarations: [SigninComponent, SignupComponent, HomeComponent],
  providers: [SignupService]
})
export class HomeModule { }
