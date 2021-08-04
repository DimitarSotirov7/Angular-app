import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFormValues } from 'src/app/interfaces/form-values';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  subsciptions: Subscription[] = [];
  invalidLoginMessage: string = '';
  passwordType: boolean = true;

  constructor(private userService: UserService, route: Router) {

    userService.authState.subscribe(u => {
      if (u?.uid) {
        route.navigateByUrl('');
      }
    });

    this.subsciptions.push(this.userService.invalid.subscribe((message) => {
      this.invalidLoginMessage = message;
    }))
   }

  login(formValues: IFormValues): void {
    this.userService.login(formValues)
  }

  eyeToggle(input: any, passwordType: string) {
    if (input.name === 'password') {
      this.passwordType = passwordType === 'password' ? true : false;
    }
    
    input.type = passwordType;
  }
}
