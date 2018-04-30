import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _cookie: CookieService, private _router: Router) { 
    this.clearuser();
  }

  ngOnInit() {
  }

  clearuser() {
    this._cookie.deleteAll();
    this._router.navigate(['/signin']);
  }
}
