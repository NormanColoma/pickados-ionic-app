import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';

import { Event } from "../../home/models/event.interface";

@Component({
    selector: 'post-form',
    templateUrl: 'post-form.html',
})
export class PostFormPage {

    private event: Event;

    constructor(public params: NavParams, public viewCtrl: ViewController) {
        this.event = this.params.data.event;
        debugger;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}