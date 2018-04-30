import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PostService} from  '../../create/create/post.service';
import {AuthService} from '../../login/auth.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() toggleVal: boolean;
  @Input() user: any;
  updatedPosts: any;
  comment: string;
  fetchComm: any = [];
  currentComm: any = [];
  
  
  constructor(private _postService: PostService, private _auth: AuthService) { }

  ngOnInit() {
    console.log("User posts: ",this.user);
    for(let i=0;i<this.user.comments.length;i++){
    this.fetchComm.push({comment: this.user.comments[i].comment,
      Time:this.user.comments[i].Time || new Date().toDateString(), comBy:this.user.comments[i].commentBy});
    }
  }
  
  formsubmit(comm: any){
    this._postService.formsubmit({content:comm,
                                  id: this.user._id,
                                  commentBy: this._auth.getuser(),
                                  commentOn: this.user._id})
    .subscribe((posts: any)=> {
        console.log("After subscribing: ",posts);
        this.updatedPosts = posts;
       this.fetchComm.push({comment: this.comment, Time:new Date().toDateString(), comBy:this._auth.getuser()});
        console.log(this.fetchComm);
        this.comment = null;
    }) 
  }

  

  toggleBox() {
    if(this.toggleVal == true){
      //console.log("Comment box!")
      this.toggleVal = true;
    }else{
      //console.log("Condition failed!");
    }
  }

}
