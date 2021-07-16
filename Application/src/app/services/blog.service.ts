import { Injectable } from '@angular/core';
import { IBlogProperties } from '../interfaces/blog-properties';
import { IDiscussionProperties } from '../interfaces/discussion-properties';
import { FirebaseService } from './firebase.service';

@Injectable()
export class BlogService {

  constructor(private firebase: FirebaseService) { }

  getBlogCategories() {
    return this.firebase.getBlogCategoriesData();
  }

  addBlog(data: IBlogProperties): void {
    this.firebase.addBlogFirestore(data);
  }

  updateBlogQuestion(blogId: string, question: string): void {
    this.firebase.setBlogQuestionFirestore(blogId, question);
  }

  deleteBlogQuestion(blogId: string): void {
    this.firebase.deleteBlogQuestionFirestore(blogId);
  }

  getBlogData(blogId: string) {
    return this.firebase.getBlogData(blogId);
  }

  getBlogsData() {
    return this.firebase.getBlogsData();
  }

  addBlogDiscussion(blogId: string, data: IDiscussionProperties): void {
    this.firebase.addBlogDiscussion(blogId, data);
  }

  updateBlogDiscussion(blogId: string, discussionId: string, answer: string): void {
    this.firebase.updateBlogDiscussion(blogId, discussionId, answer);
  }
}
