import { Component, OnInit } from '@angular/core';
import {PostService} from './create/create/post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _postservice: PostService) { 

  }

  ngOnInit() {
    this._postservice.getlists();
   //this._postservice.likecount();
  }

  
  
}
