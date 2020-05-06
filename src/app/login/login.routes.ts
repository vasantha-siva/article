import { LoginComponent } from './login.component';
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const loginRoutes: Routes = [
  { path: '', component: LoginComponent}
];


export const LoginRoute: ModuleWithProviders = RouterModule.forChild(loginRoutes);
