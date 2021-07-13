import { Component } from '@angular/core';
import { IUserProperties } from 'src/app/interfaces/user-properties';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userService: UserService) { 
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
    this.userService.setUserData('users', this.user.uid, data);
  }
}
