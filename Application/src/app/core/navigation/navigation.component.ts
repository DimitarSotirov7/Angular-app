import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @Input() userExists: boolean = false;

  get isLogged() {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) {}

  logoutHandler(): void {
    this.userService.logout();
  }
}
