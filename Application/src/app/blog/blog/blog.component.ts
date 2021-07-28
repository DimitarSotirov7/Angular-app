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
  personalBlogQuestion: boolean = false;
  addedBlogDiscussion: boolean = false;
  editedQuestion: boolean = false;
  editQuestionClicked: boolean = false;
  removeQuestionClicked: boolean = false;
  invalidQuestionInput: boolean = false;
  invalidDiscussionInput: boolean = false;

  clickedEditDiscussion: number = 0;
  clickedRemoveDiscussion: number = 0;

  constructor(private blogService: BlogService, private route: Router, private userService: UserService) {
    this.getBlogData();
  }

  getBlogData() {
    this.blogService.getBlogData(this.blogId).get().subscribe(blog => {
      if (blog.data() === undefined) {
        this.route.navigateByUrl('not-found');
      }

      this.blog = blog.data();
      this.blog.date = this.toDateTime(this.blog.date?.seconds);

      // if (this.blog?.users) {
      //   this.blog.users = (this.blog.users as [{date: string}]).map(d => {
      //     d.date = this.toDateTime(d.date.seconds);
      //     return d;
      //   });
      // }

      this.blogQuestion = this.blog?.question;
      (this.blog as IBlogProperties)?.users.sort((a, b) => { return b.did - a.did });

      this.userService.authState.subscribe(u => {
        this.currUser.uid = u?.uid;

        if (!this.currUser.uid) {
          return;
        }

        this.userService.getUserData(this.currUser.uid).get().subscribe(u => {
          this.currUser.fullName = u.data()?.firstName + ' ' + u.data()?.lastName;
        });

        if (u?.uid === this.blog?.createdByDoc) {
          this.personalBlogQuestion = true;
        }
      });
    });
  }

  updateBlogQuestion(data: any) {

    if (data.question === '') {
      this.invalidQuestionInput = true;
      setInterval(() => { this.invalidQuestionInput = false }, 1000);
      return;
    }

    this.blogService.updateBlogQuestion(this.blogId, data.question);


    this.editedQuestion = true;
    var interval = setInterval(() => {
      this.editedQuestion = false;
      this.getBlogData();
      clearInterval(interval);
    }, 1000);

    this.editQuestionToggle();
  }

  updateBlogDiscussion(discussionId: number, data: any) {

    if (data.answer === '') {
      this.invalidDiscussionInput = true;
      setInterval(() => { this.invalidDiscussionInput = false }, 1000);
      return;
    }

    this.blogService.updateBlogDiscussion(this.blogId, discussionId, data.answer);

    this.editDiscussionToggle(discussionId);
    var interval = setInterval(() => {
      this.getBlogData();
      clearInterval(interval);
    }, 1000);
  }

  deleteBlogDiscussion(discussionId: number) {

    this.blogService.deleteBlogDiscussion(this.blogId, discussionId);

    this.removeDiscussionToggle(discussionId);
    var interval = setInterval(() => {
      this.getBlogData();
      clearInterval(interval);
    }, 1000);
  }

  editQuestionToggle(): void {
    this.editQuestionClicked = !this.editQuestionClicked;
  }

  editDiscussionToggle(did: number): void {

    if (this.clickedEditDiscussion === did) {
      this.clickedEditDiscussion = 0;
    } else {
      this.clickedEditDiscussion = did;
    }
  }

  removeQuestionToggle(): void {
    this.removeQuestionClicked = !this.removeQuestionClicked;
  }

  removeDiscussionToggle(did: number): void {

    if (this.clickedRemoveDiscussion === did) {
      this.clickedRemoveDiscussion = 0;
    } else {
      this.clickedRemoveDiscussion = did;
    }
  }

  deleteBlogQuestion() {
    this.blogService.deleteBlogQuestion(this.blogId);
    this.route.navigateByUrl(`/blog/category/${this.blog.categoryName}`);
  }

  addBlogDiscussion(data: IDiscussionProperties) {

    if (data.answer === '') {
      this.invalidQuestionInput = true;
      setInterval(() => { this.invalidQuestionInput = false }, 1000);
      return;
    }

    this.blogService.addBlogDiscussion(this.blogId, {
      did: 0,
      uid: this.currUser.uid,
      fullName: this.currUser.fullName,
      answer: data.answer,
      date: new Date()
    });

    this.addedBlogDiscussion = true;
    var interval = setInterval(() => {
      this.addedBlogDiscussion = false
      this.getBlogData();
      data.answer = '';
      clearInterval(interval);
    }, 1000);
  }

  private getBlogIdFromRoute() {
    const index: number = this.route.url.lastIndexOf('/');
    return this.route.url.substring(index + 1);
  }

  private toDateTime(secs: number): string {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
  }
}
