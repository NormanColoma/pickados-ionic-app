import { Component } from "@angular/core"; 
import { NavController, ToastController } from "ionic-angular";
import { AuthService } from "./auth.service";
import { TabsPage } from "../tabs/tabs";
import { AccountCredentials } from "./models/account-credentials.interface";

@Component({
    selector: 'auth-page',
    templateUrl: 'auth.html'
})

export class AuthPage{
    public credentials : AccountCredentials;

    constructor(public navCtrl: NavController, private authService: AuthService,
    private toastCtrl: ToastController) {}

    ionViewCanEnter() {
        this.authService.isLoggedIn().subscribe((val) => {
            if (val) {
                this.navCtrl.setRoot(TabsPage);
            }
            return true; 
        });
    }

    handleLogin(credentials: AccountCredentials) {
        this.credentials = credentials;
        this.authService.login(credentials)
            .subscribe((response) => {
                if(response) {
                    this.navCtrl.setRoot(TabsPage);
                } else {
                    this.showToast("Alias o password incorrectos");
                }
            })
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