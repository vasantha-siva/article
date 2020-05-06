import { SignupComponent } from './signup.component';
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const signupRoutes: Routes = [
  { path: '', component: SignupComponent}
];


export const SignupRoute: ModuleWithProviders = RouterModule.forChild(signupRoutes);
