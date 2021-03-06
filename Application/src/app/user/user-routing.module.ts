import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'user/:id',
    pathMatch: 'full',
    component: ProfileComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'profile/:uid',
    component: ProfileComponent
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);