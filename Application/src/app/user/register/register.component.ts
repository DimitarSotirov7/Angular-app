import { Component, Output } from '@angular/core';
import { IFormValues } from 'src/app/interfaces/iform-values';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private userService: UserService) { }

  register(formValues: IFormValues): void {
    this.userService.register(formValues)
  }
}
