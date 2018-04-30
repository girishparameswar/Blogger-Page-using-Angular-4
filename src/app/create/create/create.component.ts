import { Component, OnInit } from '@angular/core';
import {PostService} from  './post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  post: any = {};
  constructor(private _pService: PostService) { }

  ngOnInit() {
  }

  savepost() {
    if((this.post.posttitle == null || undefined || 0)||
      (this.post.description == null || undefined || 0)){
      document.getElementById('not').innerHTML = "Please Enter some information!";
  } else{
      this._pService.savepost(this.post);
  }
}
}

