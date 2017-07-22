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

  private events: Event[];
  private items: Event[] = [];
  private maxEvents = 25;

  constructor(public navCtrl: NavController, private eventService: EventService) {
    
  }

  ionViewWillLoad() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.loadEvents()
      .subscribe((events: Event[]) => {
        this.events = this.filterByEventsNotStartedYet(events);
        if (this.events.length < 25) {
          this.maxEvents = this.events.length;
        }
        for (var i = 0; i < this.maxEvents; i++) {
          this.items.push(this.events[i]);
        }
      });
  }

  doInfinite(infiniteScroll) {
    const start = this.maxEvents;
    if((this.maxEvents + 25) <= this.events.length) {
      this.maxEvents += 25;
    }
    else {
      const remaining = this.events.length - this.maxEvents;
      this.maxEvents += remaining;
    }
    if (this.maxEvents <= this.events.length) {
      setTimeout(() => {
        for (let i = start; i < this.maxEvents; i++) {
          this.items.push(this.events[i]);
        }
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.enabled(false);
    }
  }

  filterByEventsNotStartedYet(events) {
    const date = new Date();
    const time = `${date.getHours().toString()}:${date.getMinutes().toString()}`;
    
    return events.filter(event => event.match_time >= time);
  }

}
