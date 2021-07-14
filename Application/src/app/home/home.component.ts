import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loggedUser: boolean = false;

  constructor(private userService: UserService) {
    this.userService.authState.subscribe(user => {
      this.loggedUser = user?.uid ? true : false;
    });
  }
}
