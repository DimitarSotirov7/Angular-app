import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  get isLogged() {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) {}

  loginHandler(): void {
    this.userService.login();
  }

  logoutHandler(): void {
    this.userService.logout();
  }

  registerHandler(): void {
    this.userService.register();
  }

}
