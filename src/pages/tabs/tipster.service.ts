import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Account } from "../auth/models/account.interface";


const API_URL : string = 'http://52.178.29.14/api/Tipster'

@Injectable()
export class TipsterService {

     constructor(private http: Http){}

     private currentEvents : Event [];

     getTipstersPremium() : Observable<Account[]>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });
         const TIMELINE_URL = `${API_URL}/GetTipstersPremium?first=0&size=100`;
         
         return this.http
            .get(TIMELINE_URL, options)
            .map((response : Response) => response.json())  
     }

     followTipsterPro(idTipsterPremium, idFollower) : Observable<boolean> {
        const FOLLOW_URL = `${API_URL}/AddingFollower?idtipster=${idTipsterPremium}&idnewfollower=${idFollower}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

         return this.http
            .post(FOLLOW_URL, {}, options)
            .map((response : Response) => response.json())  

     }

      unfollowTipsterPro(idTipsterPremium, idFollower) : Observable<boolean> {
        const FOLLOW_URL = `${API_URL}/DeletingFollower?idtipster=${idTipsterPremium}&idunfollower=${idFollower}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

         return this.http
            .post(FOLLOW_URL, {}, options)
            .map((response : Response) => response.json())  

     }

     getFollows(idTispter) : Observable<Account []>{
        const GETFOLLOWS_URL = `${API_URL}/GetFollows?id=${idTispter}`;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

         return this.http
            .get(GETFOLLOWS_URL,  options)
            .map((response : Response) => response.json())  

     }


}