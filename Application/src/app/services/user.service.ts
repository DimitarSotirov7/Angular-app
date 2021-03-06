import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IFormValues } from '../interfaces/form-values';
import { IUserProperties } from '../interfaces/user-properties';
import { FirebaseService } from './firebase.service';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  logged: EventEmitter<boolean> = new EventEmitter();
  invalid: EventEmitter<string> = new EventEmitter();
  authState: Observable<any> = this.firebase.authState;

  get isLogged() {
    return this.storageService.getItem('isLogged');
  }

  constructor(private storageService: StorageService, private firebase: FirebaseService) { }

  login(formValues: IFormValues): void {
    if (formValues.email === '' || formValues.password === '') {
      return;
    }
    this.firebase.login(formValues)
      .then(res => {
        this.logged.emit(true);
        this.rememberMe(formValues.rememberMe);
      }).catch(err => {
        this.invalid.emit(err.message);
      });
  }

  logout(): void {
    this.firebase.logout().then(res => {
      this.logged.emit(false);
      this.storageService.setItem('isLogged', false);
    }).catch(err => {
      console.log(err.message);
    });
  }

  register(formValues: IFormValues): void {
    if (formValues.email === '' || formValues.password === '' ||
      formValues.firstName === '' || formValues.lastName === '') {
      this.invalid.emit('An empty input found');
      return;
    }

    if (formValues.password !== formValues.rePassword) {
      this.invalid.emit('Password must be equal to Re-password');
      return;
    }

    this.firebase.register(formValues)
      .then(res => {
        //emit event the user is logged
        this.logged.emit(true);

        this.rememberMe(formValues.rememberMe);

        //Add data for the new user
        this.authState.subscribe(user => {
          this.firebase.addUserFirestore(user?.uid, formValues);
        });
      }).catch(err => {
        this.invalid.emit(err.message);
      });
  }

  getUserData(uid: string): AngularFirestoreDocument {
    return this.firebase.getUserData(uid);
  }

  setUserData(doc: string, data: IUserProperties) {
    return this.firebase.setUserFirestore(doc, data);
  }

  private rememberMe(rememberMe: boolean) {
    // if (rememberMe) {
    //   this.storageService.setItem('isLogged', true);
    // }

    //always true
    this.storageService.setItem('isLogged', true);
  }
}
