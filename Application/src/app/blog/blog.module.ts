import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { FormsModule } from '@angular/forms';
import { BlogRoutingModule } from './blog-routing.module';
import { RecentBlogsComponent } from './recent-blogs/recent-blogs.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogCategoryComponent,
    RecentBlogsComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule
  ],
  exports: [
    BlogComponent,
    BlogCategoryComponent,
    RecentBlogsComponent
  ]
})
export class BlogModule { }
