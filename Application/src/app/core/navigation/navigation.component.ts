import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserProperties } from 'src/app/interfaces/user-properties';
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
  icon: string = 'AA';

  constructor(private userService: UserService, route: Router) {
    this.subsciptions.push(this.userService.logged.subscribe(isLogged => {
      this.isLogged = isLogged;
      route.navigateByUrl('');
    }))
  }

  ngOnInit(): void {
    this.userService.authState.subscribe(user => {
      this.uid = user?.uid;
      
      this.userService.getUserData(this.uid).get().subscribe(doc => {
        this.icon = doc.data()?.firstName.charAt(0) + doc.data()?.lastName.charAt(0);
      });
    });
  }

  logoutHandler(): void {
    this.userService.logout();
  }
}
