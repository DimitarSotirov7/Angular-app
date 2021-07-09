import { EventEmitter, Injectable } from '@angular/core';
import { IFormValues } from '../interfaces/iform-values';
import { FirebaseService } from './firebase.service';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  logged: EventEmitter<boolean> = new EventEmitter();

  get isLogged() {
    return this.firebase.isLogged;
  }

  constructor(private storageService: StorageService, private firebase: FirebaseService) {
  }

  login(formValues: IFormValues): void {
    if (formValues.email === '' || formValues.password === '') {
      return;
    }
    const login = this.firebase.login(formValues);
    login.then(res => {
      this.logged.emit(true);
    }).catch(err => {
      console.log(err.message);
    });
  }

  logout(): void {
    this.firebase.logout();
  }

  register(formValues: IFormValues): void {
    if (formValues.email === '' || formValues.password === '') {
      return;
    }
    const register = this.firebase.register(formValues);
    register.then(res => {
      this.logged.emit(true);
    }).catch(err => {
      console.log(err.message);
    });
  }
}
