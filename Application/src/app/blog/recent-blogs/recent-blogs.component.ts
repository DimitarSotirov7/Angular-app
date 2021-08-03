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
  selectedRecords: number = 0;
  records: number[] = [];

  constructor(private blogService: BlogService) {
    this.getBlogs();
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
      this.insertRecordsOptions(this.filteredBlogs.length);
    });
  }

  filter(): void {

    if (this.selectedCategory !== "All") {
      this.filteredBlogs = this.filteredBlogs.filter(b => b.categoryName === this.selectedCategory);
    } else {
      this.filteredBlogs = this.blogs;
    }

    if (this.filteredBlogs.length < this.selectedRecords) {
      this.filteredBlogs = this.blogs.filter(b => b.categoryName === this.selectedCategory).slice(0, this.selectedRecords);
    } else {
      this.filteredBlogs = this.filteredBlogs.slice(0, this.selectedRecords);
    }
  }

  private insertRecordsOptions(length: number) {

    this.selectedRecords = length;

    for (let i = 1; i <= 3; i++) {
      let record = Math.trunc(i === 1 ? length : (length + 1) / i);
      if (!this.records.includes(record)) {
        this.records.push(record);
      }
    }
  }

  private toDateTime(secs: number): string {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
  }
}
