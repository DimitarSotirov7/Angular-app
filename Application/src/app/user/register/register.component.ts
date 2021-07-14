import { Component, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFormValues } from 'src/app/interfaces/form-values';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  subsciptions: Subscription[] = [];
  invalidRegisterMessage: string = '';

  constructor(private userService: UserService) {
    this.subsciptions.push(this.userService.invalid.subscribe((message) => {
      this.invalidRegisterMessage = message;
    }))
   }

  register(formValues: IFormValues): void {
    this.userService.register(formValues)
  }
}
