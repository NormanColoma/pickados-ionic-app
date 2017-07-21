import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Post } from "./models/post.interface";
import { ODDS } from "./constants/odds";
import { LEAGUES } from "./constants/leagues";


const API_URL : string = 'http://52.178.29.14/api/Tipster'

@Injectable()
export class TimelineService {

     constructor(private http: Http){}

     private currentEvents : Event [];

     loadTimeline(tipsterId : number) : Observable<Post[]>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });
         const TIMELINE_URL = `${API_URL}/timeline?id=${tipsterId}`;
         
         return this.http
            .get(TIMELINE_URL, options)
            .map((response : Response) => response.json())  
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