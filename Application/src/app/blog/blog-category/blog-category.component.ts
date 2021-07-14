import { Component } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css']
})
export class BlogCategoryComponent {

  addedQuestion: boolean = false;

  constructor(private blogService: BlogService) { }

  addBlogQuestion(data: { question: string }) {
    console.log(data.question)
    this.blogService.addBlog({
      categoryDoc: '',
    categoryName: '',
    questionName: '',
    createdByDoc: '',
    createdByFullName: '', 
    users: []
    });
  }
}
