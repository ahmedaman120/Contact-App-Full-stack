import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/user-service/users.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required ]),
    password: new FormControl(null, [Validators.required]),
  })

  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  login(){
    if(this.form.valid){
      this.userService.login({
        user: this.username.value,
        password: this.password.value,
      }).pipe(
        tap(()=> this.router.navigate(['/private']))
      ).subscribe();
    }
  }

  get username(): FormControl{
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl{
    return this.form.get('password') as FormControl;
  }
}
