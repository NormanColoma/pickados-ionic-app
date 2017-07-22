import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Account } from "../../auth/models/account.interface";
import { TipsterService } from "../../tabs/tipster.service";

@Component({
  selector: 'page-tipster-detail',
  templateUrl: 'tipster-detail.html',
  providers:  [
    TipsterService
  ]
})

export class TipsterDetailPage {
    private tipster: Account;
    private userId:number; 
    private isUnfollowed: boolean;

    constructor(private navParams: NavParams, 
      private tipsterService: TipsterService,
      private toastCtrl: ToastController) {
      this.tipster = navParams.data.tipster;
      this.userId = navParams.data.userId;
      this.isUnfollowed = navParams.data.isUnfollowed;
    }

  follow(tipsterPremiumId: number) {
    this.tipsterService.followTipsterPro(tipsterPremiumId, this.userId)
      .subscribe((follows: boolean) => {
        this.isUnfollowed = false;
        this.showToast(`Ahora sigues a  ${this.tipster.Alias}`);
      });
  }
  
  unfollow(tipsterPremiumId: number) {
    this.tipsterService.unfollowTipsterPro(tipsterPremiumId, this.userId)
      .subscribe((follows: boolean) => {
        this.isUnfollowed = true;
        this.showToast(`Ya no sigues a ${this.tipster.Alias}`);
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