import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('nestjs_todo_app');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
