import { Component } from '@angular/core';
import { IUserProperties } from 'src/app/interfaces/user-properties';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ASTWithSource } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user = {
    uid: '',
    email: '',
    firstName: '',
    lastName: '',
    age: '',
    location: '',
  };

  updatedMessage: boolean = false;

  constructor(private userService: UserService, private route: Router) { 
    userService.authState.subscribe(user => {
      //get data from fire auth
      this.user.email = user?.email;
      this.user.uid = user?.uid;

      //get data from firestore
      userService.getUserData(user?.uid).get().subscribe(doc => {
        this.user.firstName = doc.data()?.firstName;
        this.user.lastName = doc.data()?.lastName;
        this.user.age = doc.data()?.age;
        this.user.location = doc.data()?.location;
      });
    });
  }

  saveChanges(data: IUserProperties) {
    this.userService.setUserData(this.user.uid, data);
    this.user.firstName = data?.firstName !== '' ? data?.firstName : this.user.firstName;
    this.user.lastName = data?.lastName !== '' ? data?.lastName : this.user.lastName;

    this.updatedMessage = true;
    setInterval(() => { this.updatedMessage = false }, 1000);
  }
}
