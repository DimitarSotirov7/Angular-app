import { Component } from '@angular/core';
import { IFormValues } from 'src/app/interfaces/iform-values';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService) { }

  login(formValues: IFormValues): void {
    this.userService.login(formValues)
  }
}
