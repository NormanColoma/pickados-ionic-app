import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TipsterService } from "../tabs/tipster.service";

import { Account } from "../auth/models/account.interface";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [
    TipsterService
  ]
})
export class ContactPage {

  private tipsters : Account [];
  private follows : Account [];
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
      .subscribe((follows : Account[]) => {
        this.follows = follows;
        debugger;
        this.tipsterService.getTipstersPremium()
          .subscribe((tipsters: Account []) => {
            this.tipsters = tipsters
          });
      });
  }

  follow(tipsterPremiumId: number){
    this.tipsterService.followTipsterPro(tipsterPremiumId, this.userId)
      .subscribe((follows : boolean) => {
         this.loadTipstersAndFollows();
         const name = this.tipsters.find(tipster => tipster.Id === tipsterPremiumId).Alias;
         this.showToast(`Ahora estás suscrito a ${name}`);
      });
  }

  isUnfollowed(tipsterPremiumId: number) {
    if (this.follows) {
      const result = this.follows.some(tipsterFollowed => tipsterFollowed.Id === tipsterPremiumId);
      return result;
    }
    return false;
  }

  unfollow(tipsterPremiumId: number) {
    this.tipsterService.unfollowTipsterPro(tipsterPremiumId, this.userId)
      .subscribe((follows : boolean) => {
         this.loadTipstersAndFollows();
         const name = this.tipsters.find(tipster => tipster.Id === tipsterPremiumId).Alias;
         this.showToast(`Ya no estás suscrito a ${name}`);
      });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

}
