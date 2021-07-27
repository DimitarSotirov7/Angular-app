import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBlogProperties } from 'src/app/interfaces/blog-properties';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { blogCategoryNames } from 'src/app/interfaces/blog-category-names'

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css']
})
export class BlogCategoryComponent {

  addedQuestion: boolean = false;
  invalidInput: boolean = false;
  user = { uid: '', fullName: '' };
  categoryName: string = this.getCategoryNameFromRoute();
  blogs: any[] = [];

  constructor(private blogService: BlogService, private userService: UserService, private route: Router) { 
    this.userService.authState.subscribe(u => {
      this.user.uid = u?.uid;

      if (!this.user.uid) {
        return;
      }

      this.userService.getUserData(this.user.uid).get().subscribe(u => {
        this.user.fullName = u.data()?.firstName + ' ' + u.data()?.lastName;

        this.getBlogsData();
      });
    });
  }

  addBlogQuestion(data: IBlogProperties) {

    if (data.question === '') {
      this.invalidInput = true;
      var interval = setInterval(() => { 
        this.invalidInput = false;
        clearInterval(interval);
      }, 1000);
      return;
    }

    this.blogService.addBlog({
      categoryName: this.categoryName,
      question: data.question,
      createdByDoc: this.user.uid,
      createdByFullName: this.user.fullName,
      users: [],
      date: new Date()
    });
    
    this.getBlogsData();
    
    this.addedQuestion = true;
    var interval = setInterval(() => { 
      this.addedQuestion = false 
      data.question = '';
      clearInterval(interval);
    }, 1000);
  }


  private getBlogsData() {
    
    if (!blogCategoryNames.filter(c => c.name === this.categoryName).some(c => c.name)) {
      this.route.navigateByUrl('not-found');
    }

    this.blogService.getBlogsData().get().subscribe(blogColl => {
      
      this.blogs = blogColl.docs.filter(blog => blog.data().categoryName === this.categoryName).reverse().map(blog => { 
        return { 
          data: blog.data(), 
          id: blog.id 
        }
      });
    });
  }

  private getCategoryNameFromRoute() {
    const index: number = this.route.url.lastIndexOf('/');
    return this.route.url.substring(index + 1);
  }
}
