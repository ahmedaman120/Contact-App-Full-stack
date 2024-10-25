import { AbstractControl, ValidationErrors } from "@angular/forms";


export class CustomValidators {

  static passwordMatching(control: AbstractControl): ValidationErrors | null{
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if((password === passwordConfirm ) && password && passwordConfirm){
      return null;
    }

    return {
      passwordNotMatching: true,
    };
  }
}
