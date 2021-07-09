import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IFormValues } from '../interfaces/iform-values';

@Injectable()
export class FirebaseService {

  isLogged:boolean = false;

  constructor(private fireAuth: AngularFireAuth) { }

  login(formValues: IFormValues):Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(formValues.email, formValues.password);
  }

  register(formValues: IFormValues):Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(formValues.email, formValues.password);
  }

  async logout() {
    await this.fireAuth.signOut().then(res => {
      this.isLogged = false;
    }).catch(err => {
      console.log(err.message);
    });
  }
}
