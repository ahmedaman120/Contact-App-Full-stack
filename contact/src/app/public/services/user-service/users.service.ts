import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ILoginResponse, IUser } from '../../public.interfaces';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export const snackBarConfig: MatSnackBarConfig = {
  duration: 2500,
  horizontalPosition: 'right',
  verticalPosition: 'top',
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient,
    private snackBar : MatSnackBar
  ) { }

  login (user: IUser): Observable<ILoginResponse>{
    return this.httpClient.post<ILoginResponse>(environment.apiUrl+'/api/auth/login', user).pipe(
      tap((res: ILoginResponse)=> localStorage.setItem('nestjs_todo_app', res.token)),
      tap(()=> this.snackBar.open('Login successfully', 'Close', snackBarConfig)),
      catchError(e => {
        this.snackBar.open(`${e.error.message}`, 'Close', snackBarConfig);
        return throwError( () => e);
      })
    );
  }

  register(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>('api/users/register', user).pipe(
      tap((createdUser: IUser) => this.snackBar.open(`User ${createdUser.user} was created`,'Close', snackBarConfig)),
      catchError(e => {
        this.snackBar.open(`${e.error.message}`, 'Close', snackBarConfig);
        return throwError( () => e);
      })
    )
  }
}
