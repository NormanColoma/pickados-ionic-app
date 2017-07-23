import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { AccountCredentials } from "./models/account-credentials.interface";
import { Account } from "./models/account.interface";

const API_URL : string = 'http://52.174.166.194/api/Tipster'

@Injectable()
export class AuthService{

    constructor(private http: Http, public storage: Storage){}

    login(account: AccountCredentials): Observable<boolean>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(`${API_URL}/Login`, account, options)
            .map((response : Response) => {
                const user: Account = response.json();
                if(user){
                    this.storage.set('user', user);
                    return true;
                }
                return false;
            },(error: Response) => {
                 return Observable.throw(error);
            });
    }

    isLoggedIn(): Observable<boolean>{
        return Observable
            .fromPromise(this.storage.get('user'))
            .map((val) => {
                if(val) {
                    return true;
                }
                return false;
            },(error: Response) => {
                 return Observable.throw(error);
            });
    }

    getUser(): Observable<Account> {
        return Observable
            .fromPromise(this.storage.get('user'))
            .map((user : Account) => {
                return user;
            });
    }

}