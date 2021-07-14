import { Component } from '@angular/core';
import { IBlogCategoriesProperties } from '../interfaces/blog-categories-properties';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  categories: any[] = [];

  constructor(private blogService: BlogService) {
    this.blogService.getBlogCategories().get().subscribe(coll => {
      this.categories = coll.docs.map(c => c.data());
    });
   }
}
