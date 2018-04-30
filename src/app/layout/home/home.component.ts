import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username : string;
  constructor(private _authService: AuthService) { 
    this.getuser();
  }

  ngOnInit() {
  }

  getuser() {
    this.username = this._authService.getuser();
  }

}
