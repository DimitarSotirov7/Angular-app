import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBlogProperties } from 'src/app/interfaces/blog-properties';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  blog: any = {};
  blogId: string = this.getBlogIdFromRoute();

  constructor(private blogService: BlogService, private route: Router) { 
    this.getBlogData();
  }

  getBlogData() {
    this.blogService.getBlogData(this.blogId).get().subscribe(blog => {
      this.blog = blog.data();
      console.log(this.blog);
    });
  }

  private getBlogIdFromRoute() {
    const index: number = this.route.url.lastIndexOf('/');
    return this.route.url.substring(index + 1);
  }
}
