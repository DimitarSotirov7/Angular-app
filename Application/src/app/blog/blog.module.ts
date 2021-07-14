import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { FormsModule } from '@angular/forms';
import { BlogRoutingModule } from './blog-routing.module';



@NgModule({
  declarations: [
    BlogComponent,
    BlogCategoryComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule
  ],
  exports: [
    BlogComponent,
    BlogCategoryComponent
  ]
})
export class BlogModule { }
