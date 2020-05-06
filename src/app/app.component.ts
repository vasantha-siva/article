import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLoggedIn;
  constructor(authService: AuthService,router: Router){
    this.isLoggedIn = false;
    if (authService.isLoggedIn()) {
      this.isLoggedIn = true;
      router.navigate(['article']);
    }
  }

}
