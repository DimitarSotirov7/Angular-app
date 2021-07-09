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

  login(): void {
    this.firebase.login('demo@demo.com', 'demo123');
    if (this.firebase.isLogged) { 
      this.storageService.setItem('isLogged', true); 
    }
  }

  logout(): void {
    this.firebase.logout();
    if (!this.firebase.isLogged) {
    this.storageService.setItem('isLogged', false);
    }
  }

  register(): void {
    this.firebase.register('test@test.com', 'test123');
    if (this.firebase.isLogged) {
    this.storageService.setItem('isLogged', true);
    }
  }
}
