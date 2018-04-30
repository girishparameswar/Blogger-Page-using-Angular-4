import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  auth: any = {};
  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  authenticate(){
    this.authservice.authenticate(this.auth);
    //console.log(this.auth);
  }

}
