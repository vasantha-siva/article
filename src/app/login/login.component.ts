import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  loginForm: FormGroup;
  constructor(private loginService: LoginService, private fb: FormBuilder, private modalService: BsModalService, private router: Router, private _flashMessagesService:FlashMessagesService) { 
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',  Validators.required],
    });
  }

  login() {
    this.loginService.loginUser(this.loginForm.value).subscribe( data => {

        localStorage.setItem('user', JSON.stringify(data) );
            this.router.navigate(['/article']);
    }, error => {
      console.log('error' + JSON.stringify(error.error));
     this._flashMessagesService.show(error.error.body.message, {cssClass: 'alert-danger', timeout: 3000});
    });
  }

}
