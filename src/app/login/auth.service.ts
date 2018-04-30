import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  constructor(private http:HttpClient, private _router:Router, private cookieservice:CookieService) { }

  authenticate(details){
    this.http.post('http://localhost:2000/authenticate', details)
    .subscribe((data:any) => {
      console.log("Current User: ", details);
      console.log(data.loggedIn);
      if(data.loggedIn===true) {
        this.cookieservice.set('loggedIn', data.loggedIn);
        this.cookieservice.set('hash_token', data.token);
        this.cookieservice.set('curr_user', details.username);
        this._router.navigate(['/home']);
      } else {
        document.getElementById('success').innerHTML = "Please enter correct Username or Password";
        console.log("invalid user");
        this._router.navigate(['/signin']);
      }
    });
  }

  checkLogin() {
    return this.cookieservice.get('loggedIn');
  }

  fetchToken() {
    return this.cookieservice.get('hash_token');
  }

  getuser() {
    return this.cookieservice.get('curr_user');
  }



}
