import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PostService } from '../create/create/post.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 
//import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  display: any = 'none';
  posts: any = [];
  values = '';
  tempCount: any = [];
  error: any;
  subject1 = new BehaviorSubject(this.tempCount);
  
  constructor(private _postService: PostService) { 
  }

  
  ngOnInit() {
    this.getdata();
  }
  
  getdata() {
    this._postService.getlists().subscribe((data: any)=>{
      console.log(data)
      if(data.length!==0){
        this.posts = data;
        for (let i=0; i<this.posts.length;i++){
          this.tempCount[i] = {likes:this.posts[i].likes, id:this.posts[i]._id}
        }
      }else{
          console.log("No posts available!");
          this.error="No Blogs Available!";
        }
  });
  }

  countlike(data: any) {
    console.log("Current post: ",data._id);

    this._postService.countlike(data._id)
    .subscribe((data: any)=> {
      this.subject1.next({id: data._id, likes: data.likes})
      if(data!==0){
          console.log("Liked data: " ,data.likes);
      }else{
          console.log("No data!");
      }
      this.subject1.subscribe((like:any)=>{
        console.log(like);
        for (let i=0; i<this.tempCount.length;i++){
          console.log(this.tempCount.length)
          if(this.tempCount[i].id===like.id){
            this.tempCount[i].likes = like.likes;
            console.log("like: ",like);
            console.log("Post id: ",data._id);
            console.log("tempCount like: ",this.tempCount);
          }else{
          }
        }
  })
});
}


comment() {
    
}
}
