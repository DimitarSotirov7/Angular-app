import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IFormValues } from '../interfaces/iform-values';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUserProperties } from '../interfaces/user-properties';

@Injectable()
export class FirebaseService {

  userProperties: IUserProperties = {
    firstName: '',
    lastName: '',
    age: '',
    location: '',
  };
  authState: Observable<any> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  login(formValues: IFormValues):Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(formValues.email, formValues.password);
  }

  register(formValues: IFormValues):Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(formValues.email, formValues.password);
  }

  logout():Promise<any> {
    return this.fireAuth.signOut();
  }

  addUserFirestore(collection: string, doc: string):void {
    this.firestore.collection(collection).doc(doc).set({
      firstName: '',
      lastName: '',
      age: '',
      location: '',
    } as IUserProperties);
  }

  getUserData(collection: string, doc: string): AngularFirestoreDocument {
    return this.firestore.collection(collection).doc(doc);
  }

  setUserFirestore(collection: string, doc: string, data: IUserProperties):void {
    this.firestore.collection(collection).doc(doc).set({
      firstName: data?.firstName,
      lastName: data?.lastName,
      age: data?.age,
      location: data?.location,
    } as IUserProperties);
  }
}
