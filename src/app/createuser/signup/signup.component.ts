import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any = {};
  notify: any;
  constructor(private userservice: UserService) { }

  ngOnInit() {
  
  }

  createUser() {
    console.log(this.user);
    this.userservice.createUser(this.user);
  }

}
