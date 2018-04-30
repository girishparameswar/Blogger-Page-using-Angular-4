import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private _router: Router) { }

  createUser(details) {
      this.http.post('http://localhost:2000/createuser', details)
    .subscribe((data: any) => {
      if(data.length!=0) {
        console.log("User Saved");
        document.getElementById('notify').innerHTML = "Sign In Successful!";
        this._router.navigate(['signin']);
      }else{
        console.log("No user Data!");
        document.getElementById('notify').innerHTML = "Please Enter some information!";
      }
    });
    }
  }
