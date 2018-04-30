import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { CreateComponent } from './create/create/create.component';
import { ListComponent } from './list.component';
import { SignupComponent } from './createuser/signup/signup.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { HomeComponent } from './layout/home/home.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

import { AuthService } from './login/auth.service';
import {CookieService} from 'ngx-cookie-service';
import { UserService } from './createuser/signup/user.service';
import {PostService} from './create/create/post.service';

import { AuthGuard } from './login/login/auth.guard';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './post/comment/comment.component';
import { ViewComponent } from './post/view/view.component';
import { TimePipe } from './pipes/time-pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    ListComponent,
    TimePipe,
    SignupComponent,
    HomeComponent,
    LogoutComponent,
    PageNotFoundComponent,
    NavigationComponent,
    PostComponent,
    CommentComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'signin', component:LoginComponent},
      {path: 'register', component:SignupComponent},
      {path: 'home',component: HomeComponent, canActivate : [AuthGuard]},
      {path: 'lists', component:ListComponent, canActivate : [AuthGuard]},
      {path: 'create', component:CreateComponent, canActivate : [AuthGuard]},
      {path: 'logout', component:LogoutComponent},
      {path: '', redirectTo:'signin', pathMatch:'full'},
      {path: '**', component:PageNotFoundComponent, pathMatch:'full'}
    ])
  ],
  providers: [AuthService, UserService, PostService, CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
