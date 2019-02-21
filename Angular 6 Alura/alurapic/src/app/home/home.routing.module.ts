import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

// Router Guard
import { LoginGuard } from '../core/auth/login.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginGuard],
    /**
     * Rotas filhas de 'HomeComponent' serão renderizadas pelo 'router-outlet' de home.
     */
    children: [
      {
        path: '',
        component: SigninComponent,
        data: {
          title: 'Sign in'
        }
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: {
          title: 'Sign up'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
