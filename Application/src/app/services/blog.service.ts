import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable()
export class BlogService {

  constructor(private firebase: FirebaseService) { }

  getBlogCategories() {
    return this.firebase.getBlogCategoriesData();
  }
}
