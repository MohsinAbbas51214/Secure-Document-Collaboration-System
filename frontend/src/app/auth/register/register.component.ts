import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'User';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.username, this.password, this.role).subscribe(
      response => {
        console.log('Registration Successful', response);
      },
      error => {
        console.error('Registration Failed', error);
      }
    );
  }
}
