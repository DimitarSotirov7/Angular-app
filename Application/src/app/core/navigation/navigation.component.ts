import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  subsciptions: Subscription[] = [];
  isLogged = false;

  constructor(private userService: UserService, route: ActivatedRoute) {
    this.subsciptions.push(this.userService.logged.subscribe((isLogged) => {
      this.isLogged = isLogged;
      console.log('logged')
    }))
  }

  logoutHandler(): void {
    this.userService.logout();
  }
}
