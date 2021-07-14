import { RouterModule, Routes } from '@angular/router';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {
    path: 'blog/category/:id',
    pathMatch: 'full',
    component: BlogCategoryComponent
  },
  {
    path: 'blog/:id',
    pathMatch: 'full',
    component: BlogComponent
  }
];

export const BlogRoutingModule = RouterModule.forChild(routes);