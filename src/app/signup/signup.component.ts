import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SignupService } from './signup.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private signupservice: SignupService, private fb: FormBuilder, private router: Router, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',  Validators.required],
      address: ['', Validators.required]
    });
  }

  submit() {
    this.signupservice.registerUser(this.signUpForm.value).subscribe( data => {
      this.flashMessagesService.show('New user created', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['']);

    }, error => {
      console.log(error.error);
     this.flashMessagesService.show(error.error.body.message, {cssClass: 'alert-danger', timeout: 3000});
      });
  }

}
