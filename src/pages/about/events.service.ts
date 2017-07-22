import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Event } from "../home/models/event.interface";
import { LEAGUES } from "../home/constants/leagues";
import { ODDS } from "../home/constants/odds";

const API_URL : string = 'http://52.178.29.14/api/Tipster'

@Injectable()
export class EventService {

     constructor(private http: Http){}

     private currentEvents : Event [];

     loadEvents() : Observable<Event[]> {
         const date = new Date();
         const event_date = date.getFullYear()+"-"+ (date.getMonth()+1) + "-" + date.getDate();
         const EVENTS_URL = `http://52.178.29.14/api/events?from=${event_date}&to=${event_date}`;
         
         return this.http
            .get(EVENTS_URL)
            .map((response : Response) => {
                const events = JSON.parse(response.json());
                const unstartedEvents = events
                    .filter(ev => (ev.match_status === "" || ev.match_status === "Postp."))
                    .sort((a, b) => {
                        if (a.match_time > b.match_time) {
                                return 1;
                            }
                            if (a.match_time < b.match_time) {
                                return -1;
                            }
                            return 0;
                        });
                    
                return unstartedEvents;
            })  
     }

     loadEvent(match_id:string): Observable<Event> {
         const date = new Date();
         const event_date = date.getFullYear()+"-"+ (date.getMonth()+1) + "-" + date.getDate();
         const EVENTS_URL = `http://52.178.29.14/api/events?from=${event_date}&to=${event_date}`;
         
         return this.http
            .get(EVENTS_URL)
            .map((response : Response) => {
                const events = JSON.parse(response.json());
                const event = events
                    .find(ev => ev.match_id === match_id);
                
                const index = Math.floor(Math.random() * (ODDS.length -1)) + 1
                const odds = ODDS[index];
                event.odds = odds;
                return event;
            })  
     }

     getLeague(id) {
        const league = LEAGUES
            .find(league => league.league_id === id);
        if (!league)
            return "Desconocido";
        return league.league_name;
     }

     getCountry(id) {
          const country = LEAGUES
            .find(league => league.country_id === id);
         if (!country)
            return "Desconocido";
        return country.country_name;
     }
}