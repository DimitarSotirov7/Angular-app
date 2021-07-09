import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class FirebaseService {

  isLogged:boolean = false;

  constructor(private fireAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    await this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
      this.isLogged = true;
    }).catch(err => {
      console.log(err.message);
    });
  }

  async register(email: string, password: string) {
    await this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      this.isLogged = true;
    }).catch(err => {
      console.log(err.message);
    });
  }

  async logout() {
    await this.fireAuth.signOut().then(res => {
      this.isLogged = false;
    }).catch(err => {
      console.log(err.message);
    });
  }
}
