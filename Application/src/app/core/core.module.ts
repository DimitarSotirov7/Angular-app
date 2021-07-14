import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';



@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
    UserService,
    StorageService
  ]
})
export class CoreModule { }
