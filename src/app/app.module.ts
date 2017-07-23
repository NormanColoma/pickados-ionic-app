import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthPage } from "../pages/auth/auth";
import { AuthService } from "../pages/auth/auth.service";
import { TipsterDetailPage } from "../pages/contact/tipster-detail/tipster-detail";
import { PostFormPage } from "../pages/about/post-form/post-form";

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TipsterDetailPage,
    PostFormPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TipsterDetailPage,
    PostFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: "es-ES" },
    AuthService
  ]
})
export class AppModule {}
