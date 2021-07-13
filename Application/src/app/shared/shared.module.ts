import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    LoaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
