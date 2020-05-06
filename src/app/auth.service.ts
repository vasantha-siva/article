import { Router } from '@angular/router';
import { Injectable, Output } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
    loginFlag = false;
  constructor(private http: HttpClient, private route: Router) { }

  isLoggedIn() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
  
}
