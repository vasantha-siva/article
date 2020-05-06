import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const appRoutes: Routes = [
  { path: 'article', loadChildren: '../app/article/article.module#ArticleModule', canActivate:[AuthGuard]},

  {path: '', loadChildren: '../app/login/login.module#LoginModule' },
  {path: 'signup', loadChildren: '../app/signup/signup.module#SignupModule' },
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(
  appRoutes
);
