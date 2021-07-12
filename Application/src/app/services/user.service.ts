import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IFormValues } from '../interfaces/iform-values';
import { IUserProperties } from '../interfaces/user-properties';
import { FirebaseService } from './firebase.service';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  logged: EventEmitter<boolean> = new EventEmitter();
  invalid: EventEmitter<string> = new EventEmitter();
  authState:Observable<any> = this.firebase.authState;

  get isLogged() {
    return this.storageService.getItem('isLogged');
  }

  constructor(private storageService: StorageService, private firebase: FirebaseService) {}

  login(formValues: IFormValues): void {
    if (formValues.email === '' || formValues.password === '') {
      return;
    }
    const login = this.firebase.login(formValues);
    login.then(res => {
      this.logged.emit(true);
      this.storageService.setItem('isLogged', true);
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
    if (formValues.email === '' || formValues.password === '') {
      return;
    }
    const register = this.firebase.register(formValues);
    register.then(res => {
      //emit event the user is logged
      this.logged.emit(true);

      this.storageService.setItem('isLogged', true);

      //Add data for the new user
      this.authState.subscribe(user => {
        this.firebase.addUserFirestore('users', user?.uid);
      });
    }).catch(err => {
      this.invalid.emit(err.message);
    });
  }
  
  getUserData(uid: string):AngularFirestoreDocument {
    return this.firebase.getUserData('users', uid);
  }

  setUserData(collection: string, doc: string, data: IUserProperties) {
    return this.firebase.setUserFirestore(collection, doc, data);
  }
}
