import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'public',
    loadChildren: ()=> import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'private',
    canActivate:[authGuard],
    loadChildren: ()=> import('./private/private.module').then(m => m.PrivateModule)
  },
  {
    path: '**',
    redirectTo: 'public',
    pathMatch: 'full'
  }
];
