import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loggedUser: boolean = false;
  appName: string = environment.application.name;

  constructor(private userService: UserService) {
    this.userService.authState.subscribe(user => {
      this.loggedUser = user?.uid ? true : false;
    });
  }
}
