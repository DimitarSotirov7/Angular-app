import { Component, Input } from '@angular/core';
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

  
  @Input() blogQuestion: string = '';

  currUser: any = {
    uid: '',
    fullName: ''
  };
  blog: any = {};
  blogId: string = this.getBlogIdFromRoute();
  personalBlog: boolean = false;
  addedBlogDiscussion: boolean = false;
  editedQuestion: boolean = false;
  editClicked: boolean = false;
  removeClicked: boolean = false;
  invalidInput: boolean = false;

  constructor(private blogService: BlogService, private route: Router, private userService: UserService) {
    this.getBlogData();
  }

  getBlogData() {
    this.blogService.getBlogData(this.blogId).get().subscribe(blog => {
      this.blog = blog.data();
      this.blogQuestion = this.blog.question;
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

  updateBlogQuestion(data: any) {

    if (data.question === '') {
      this.invalidInput = true;
      setInterval(() => { this.invalidInput = false }, 1000);
      return;
    }

    this.blogService.updateBlogQuestion(this.blogId, data.question);

    
    this.editedQuestion = true;
    setInterval(() => {
      this.editedQuestion = false;
      this.getBlogData();
    }, 1000);
    
    this.editToggle();
  }

  editToggle(): void {
    this.editClicked = !this.editClicked;
  }

  removeToggle(): void {
    this.removeClicked = !this.removeClicked;
  }

  deleteBlogQuestion() {
    this.blogService.deleteBlogQuestion(this.blogId);
    this.route.navigateByUrl(`/blog/category/${this.blog.categoryName}`);
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
