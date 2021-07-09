import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  get isLogged() {
    return this.storageService.getItem('isLogged');
  }

  constructor(private storageService: StorageService, private firebase: FirebaseService) {
  }

  login(email: string, password: string): void {
    if (email === '' || password === '') {
      return;
    }
    this.firebase.login(email, password);
    if (this.isLogged) { 
      this.storageService.setItem('isLogged', true); 
    }
  }

  logout(): void {
    this.firebase.logout();
    if (!this.isLogged) {
    this.storageService.setItem('isLogged', false);
    }
  }

  register(email: string, password: string): void {
    if (email === '' || password === '') {
      return;
    }
    this.firebase.register(email, password);
  }
}
