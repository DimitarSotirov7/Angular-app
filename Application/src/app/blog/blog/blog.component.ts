import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBlogProperties } from 'src/app/interfaces/blog-properties';
import { IDiscussionProperties } from 'src/app/interfaces/discussion-properties';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  currUser: any = {
    uid: '',
    fullName: ''
  };
  blog: any = {};
  blogId: string = this.getBlogIdFromRoute();
  personalBlog: boolean = false;
  addedBlogDiscussion: boolean = false;
  invalidInput: boolean = false;

  constructor(private blogService: BlogService, private route: Router, private userService: UserService) {
    this.getBlogData();
  }

  getBlogData() {
    this.blogService.getBlogData(this.blogId).get().subscribe(blog => {
      this.blog = blog.data();
      this.blog.users.reverse();

      this.userService.authState.subscribe(u => {
        this.currUser.uid = u?.uid;

        if (!this.currUser.uid) {
          return;
        }

        this.userService.getUserData(this.currUser.uid).get().subscribe(u => {
          this.currUser.fullName = u.data()?.firstName + ' ' + u.data()?.lastName;
        });

        if (u?.uid === this.blog.createdByDoc) {
          this.personalBlog = true;
        }
      });
    });
  }

  addBlogDiscussion(data: IDiscussionProperties) {

    if (data.answer === '') {
      this.invalidInput = true;
      setInterval(() => { this.invalidInput = false }, 1000);
      return;
    }

    this.blogService.addBlogDiscussion(this.blogId, {
      uid: this.currUser.uid,
      fullName: this.currUser.fullName,
      answer: data.answer,
      date: Date.now()
    });

    this.addedBlogDiscussion = true;
    setInterval(() => { 
      this.addedBlogDiscussion = false 
      this.getBlogData();
      data.answer = '';
    }, 1000);
  }

  private getBlogIdFromRoute() {
    const index: number = this.route.url.lastIndexOf('/');
    return this.route.url.substring(index + 1);
  }
}
