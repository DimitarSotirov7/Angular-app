import { Component } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { MatFormFieldControl } from '@angular/material/form-field';
import { IBlogProperties } from 'src/app/interfaces/blog-properties';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-recent-blogs',
  templateUrl: './recent-blogs.component.html',
  styleUrls: ['./recent-blogs.component.css']
})
export class RecentBlogsComponent {

  blogs: DocumentData[] = [];
  filteredBlogs: DocumentData[] = [];
  categories: string[] = []; 
  selectedCategory: string = 'All';

  counts: number[] = [
    5, 10, 15, 20, 25, 30
  ];

  constructor(private blogService: BlogService) {
    this.getBlogs();
  }

  filterCategories(selectedCategory: string) {

    if (selectedCategory !== 'All' && selectedCategory) {
      this.filteredBlogs = this.blogs.filter(b => b.categoryName === selectedCategory);
    } else {
      this.filteredBlogs = this.blogs;
    }
  }

  filterCounts(count: number) {
    this.filteredBlogs = this.blogs.slice(0, count);
    console.log(this.filteredBlogs.length)
  }

  private getBlogs() {

    this.blogService.getBlogsData().get().subscribe(coll => {
      this.blogs = coll.docs
        .sort((a, b) => { return b.data()?.date - a.data()?.date })
        .map(b => {
          b.data().date = this.toDateTime(b.data().date?.seconds);
          return b.data();
        });

      //format dates
      this.blogs.map(b => {
        b.date = this.toDateTime(b.date?.seconds);
        if (!this.categories.includes(b.categoryName)) {
          this.categories.push(b.categoryName);
        }
        return b;
      });

      this.filteredBlogs = this.blogs;
    });
  }

  private toDateTime(secs: number): string {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
  }
}
