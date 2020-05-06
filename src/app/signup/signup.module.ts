import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupRoute } from './signup.routes';
import { FormsModule, ReactiveFormsModule, NgModel, NgForm } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    SignupRoute,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
