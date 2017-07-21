import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventService } from "./events.service";

import { Event } from "../home/models/event.interface";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [
    EventService
  ]
})
export class AboutPage {

  private events : Event [];

  constructor(public navCtrl: NavController, private eventService: EventService) {

  }

  ionViewWillEnter() {
    this.eventService.loadEvents()
      .subscribe((events : Event []) => {
        this.events = events;
      });
  }

}
