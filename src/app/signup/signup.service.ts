import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as Constant from '../app.constants';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})

export class SignupService {
  constructor(private http: HttpClient) { }
  registerUser(payload) {
    return this.http.post(Constant.BACKEND_API_ROOT_URL + Constant.USER_URL, payload, httpOptions);
  } 
}
