import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFormValues } from 'src/app/interfaces/form-values';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  subsciptions: Subscription[] = [];
  invalidLoginMessage: string = '';

  constructor(private userService: UserService) {
    this.subsciptions.push(this.userService.invalid.subscribe((message) => {
      this.invalidLoginMessage = message;
    }))
   }

  login(formValues: IFormValues): void {
    this.userService.login(formValues)
  }
}
