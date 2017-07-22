import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelineService } from "./timeline.service";
import { Post } from "./models/post.interface";
import { Account } from "../auth/models/account.interface";
import { AuthService } from "../auth/auth.service";

import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    TimelineService
  ]
})
export class HomePage {

  private posts : Post [];

  constructor(public navCtrl: NavController, private timelineService: TimelineService, private authService: AuthService) {

  }

  ionViewWillEnter() {
   
    this.authService.getUser()
      .switchMap(user => this.timelineService.loadTimeline(user.Id))
      .subscribe((posts : Post[]) => {
        this.posts = posts;
      });
  }

  likePost(postId:number) {
    this.timelineService.likePost(postId)
      .subscribe((likes: number) => {
        this.setLikes(likes, postId);
      })
  }

  setLikes(likes:number, postId:number) {
    const post = this.posts.find(post => post.Id === postId);
    post.Likes = likes;
  }

}
