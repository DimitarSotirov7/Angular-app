import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IFormValues } from '../interfaces/form-values';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUserProperties } from '../interfaces/user-properties';
import { IBlogProperties } from '../interfaces/blog-properties';
import { blogCategoryNames } from '../interfaces/blog-category-names';
import { IBlogCategoriesProperties } from '../interfaces/blog-categories-properties';
import { environment } from '../../environments/environment';

@Injectable()
export class FirebaseService {

  userColl: string = 'users';
  blogColl: string = 'blogs';
  blogCategoryColl: string = 'blogCategories';

  userProperties: IUserProperties = {
    firstName: '',
    lastName: '',
    age: '',
    location: '',
  };
  authState: Observable<any> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.blogCategoriesFirestoreSeeder();
  }

  // ---------------- Authentication ---------------- 

  login(formValues: IFormValues): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(formValues.email, formValues.password);
  }

  register(formValues: IFormValues): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(formValues.email, formValues.password);
  }

  logout(): Promise<any> {
    return this.fireAuth.signOut();
  }

  // ---------------- Firestore - users ---------------- 

  addUserFirestore(doc: string, userProperties: IFormValues): void {
    this.firestore.collection(this.userColl).doc(doc).set({
      firstName: userProperties.firstName,
      lastName: userProperties.lastName,
      age: '',
      location: '',
    } as IUserProperties);
  }

  getUserData(doc: string): AngularFirestoreDocument {
    return this.firestore.collection(this.userColl).doc(doc);
  }

  setUserFirestore(doc: string, data: IUserProperties): void {
    if (data.firstName !== '') {
      this.firestore.collection(this.userColl).doc(doc).update({ firstName: data?.firstName });
    }
    if (data.lastName !== '') {
      this.firestore.collection(this.userColl).doc(doc).update({ lastName: data?.lastName });
    }
    if (data.age !== '') {
      this.firestore.collection(this.userColl).doc(doc).update({ age: data?.age });
    }
    if (data.location !== '') {
      this.firestore.collection(this.userColl).doc(doc).update({ location: data?.location });
    }
  }

  // ---------------- Firestore - blogs ---------------- 

  getBlogData(doc: string): AngularFirestoreDocument {
    return this.firestore.collection(this.blogColl).doc(doc);
  }

  getBlogsData(): AngularFirestoreCollection {
    return this.firestore.collection(this.blogColl);
  }

  addBlogFirestore(data: IBlogProperties): void {
    this.firestore.collection(this.blogColl).add(data);
  }

  setBlogFirestore(doc: string, data: IBlogProperties): void {
    if (data.questionName !== '') {
      this.firestore.collection(this.blogColl).doc(doc).update({ questionName: data?.questionName });
    }
  }

  // ---------------- Firestore - blogCategories ---------------- 

  getBlogCategoryData(doc: string): AngularFirestoreDocument {
    return this.firestore.collection(this.blogCategoryColl).doc(doc);
  }

  getBlogCategoriesData(): AngularFirestoreCollection {
    return this.firestore.collection(this.blogCategoryColl);
  }

  private blogCategoriesFirestoreSeeder(): void {
    //admin only
    this.authState.subscribe(user => {
      if(user?.email === environment.admin.email) {
        blogCategoryNames.forEach(bc => {
          this.getBlogCategoryData(bc.doc).get().subscribe((doc) => {
            if (!doc.exists) {
              const data: IBlogCategoriesProperties = { name: bc.name };
              this.firestore.collection(this.blogCategoryColl).doc(bc.doc).set(data);
            };
          })
        });
      }; 
    });
  }
}
