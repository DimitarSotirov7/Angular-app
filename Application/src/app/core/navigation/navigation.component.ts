import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  subsciptions: Subscription[] = [];
  isLogged = this.userService.isLogged;
  uid: string = '';

  constructor(private userService: UserService, route: Router) {
    this.subsciptions.push(this.userService.logged.subscribe(isLogged => {
      this.isLogged = isLogged;
      route.navigateByUrl('');
    }))
  }

  ngOnInit(): void {
    this.userService.authState.subscribe(user => {
      this.uid = user?.uid;
    });
  }

  logoutHandler(): void {
    this.userService.logout();
  }
}
