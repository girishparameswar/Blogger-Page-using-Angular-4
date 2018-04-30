import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';


@Injectable()
export class PostService {

    
    post: any = {};
    id: any;
    from: any = {};
    constructor(private http: HttpClient, private _router: Router, private _authService : AuthService) { }

    savepost(postdat) {
            this.post = {
                postTitle:postdat.posttitle,
                description:postdat.description,
                createdBy:this._authService.getuser(),
                likes:0,
                Time: new Date().toDateString(),
                comments:[]
            };
            console.log("Got at Service: ",this.post);
            this.http.post("http://localhost:2000/createlist", this.post)
            .subscribe((data: any) => {
                if(data!==0){
                    console.log("After Subscribing at the post", data);
                    document.getElementById('not').innerHTML = "Posted Successfully!";
                    setTimeout(() => {
                        this._router.navigate(['/home']);
                    }, 1500);
                }else{
                    document.getElementById('not').innerHTML = "Error Posting!!";
                }
            });
         }

    getlists() {
       return this.http.get("http://localhost:2000/getlists", {
        headers: new HttpHeaders().set('auth', this._authService.fetchToken())
        });
    }

    countlike(id){
        console.log("Current post at service: ",id);
        return this.http.put("http://localhost:2000/inc_count/"+id, id, {
            headers: new HttpHeaders().set('auth', this._authService.fetchToken())
        });  
    }

    formsubmit(data){
        console.log(data);
        return this.http.post("http://localhost:2000/submitCom",data, {
            headers: new HttpHeaders().set('auth', this._authService.fetchToken())
        });
    }
}