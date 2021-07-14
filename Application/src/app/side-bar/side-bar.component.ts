import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  categories: string[] = [];

  constructor(private blogService: BlogService) {
    this.blogService.getBlogCategories().get().subscribe(coll => {
      this.categories = coll.docs.map(c => c.data().name);
      console.log(this.categories);
    });
   }
}
