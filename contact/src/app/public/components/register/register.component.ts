import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validtors';
import { UsersService } from '../../services/user-service/users.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email ]),
    username:  new FormControl(null, [Validators.required,]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
  }, {
    validators : CustomValidators.passwordMatching,
  })

  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  register(){
    if(this.form.valid){
      this.userService.register({
        email: this.email.value,
        user: this.username.value,
        password: this.password.value,
      }).pipe(
        tap(()=> this.router.navigate(['../login']))
      ).subscribe();
    }
  }

  get email(): FormControl{
    return this.form.get('email') as FormControl;
  }

  get username(): FormControl{
    return this.form.get('username') as FormControl;
  }
  get password(): FormControl{
    return this.form.get('email') as FormControl;
  }
  get passwordConfirm(): FormControl{
    return this.form.get('passwordConfirm') as FormControl;
  }
}
