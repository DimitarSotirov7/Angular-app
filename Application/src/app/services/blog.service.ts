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

  getBlogData(blogId: string) {
    return this.firebase.getBlogData(blogId);
  }

  getBlogsData() {
    return this.firebase.getBlogsData();
  }

  addBlogDiscussion(blogId: string, data: IDiscussionProperties): void {
    this.firebase.addBlogDiscussion(blogId, data);
  }
}
