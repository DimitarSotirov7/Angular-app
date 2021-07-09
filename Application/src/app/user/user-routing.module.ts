import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'user/:id',
    pathMatch: 'full',
    component: ProfileComponent
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);