import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TipsterService } from "../tabs/tipster.service";

import { Account } from "../auth/models/account.interface";
import { AuthService } from "../auth/auth.service";
import { TipsterDetailPage } from "./tipster-detail/tipster-detail";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [
    TipsterService
  ]
})
export class ContactPage {

  private tipsters: Account[];
  private follows: Account[];
  private userId: number;

  constructor(public navCtrl: NavController,
    private tipsterService: TipsterService, private authService: AuthService,
    private toastCtrl: ToastController) {

  }

  ionViewWillEnter() {
    this.loadTipstersAndFollows();
  }

  loadTipstersAndFollows() {
    this.authService.getUser()
      .switchMap((user) => {
        this.userId = user.Id;
        return this.tipsterService.getFollows(this.userId)
      })
      .subscribe((follows: Account[]) => {
        this.follows = follows;
        this.getTipsters();
      });
  }

  getTipsters() {
    this.tipsterService.getTipstersPremium()
      .subscribe((tipsters: Account[]) => {
        this.tipsters = tipsters
      });
  }

  isUnfollowed(tipsterPremiumId: number) {
    if (this.follows) {
      const result = this.follows.find(tipsterFollowed => tipsterFollowed.Id === tipsterPremiumId);
      if(result) {
        return false;
      }
      return true;
    }
    return false;
  }

  navigateToDetail(tipsterId: number) {
    const tipster= this.tipsters.find(tipster => tipster.Id === tipsterId);
    const unfollowed = this.isUnfollowed(tipsterId);

    this.navCtrl.push(TipsterDetailPage, {
      tipster,
      userId: this.userId,
      isUnfollowed: unfollowed
    });
  }

}
