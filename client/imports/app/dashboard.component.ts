import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';

import { Hero } from '../../../both/models/hero.model';
import { Heroes } from '../../../both/collections/heroes.collection';

import template from './dashboard.component.html';

@Component({
  selector: 'my-dashboard',
  template
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Observable<Hero[]>;
  heroesSub: Subscription;
  countdown: number[];
  countdownHandle: any;
  now: number;

  ngOnInit(): void {
    Meteor.apply('getServerTime', [], { wait: true, onResultReceived: this.onResultReceivedFunction.bind(this)});
    this.countdown = new Array();
    if(this.heroesSub){
      this.heroesSub.unsubscribe();
    }

    this.heroesSub = MeteorObservable.subscribe('userheroes', Meteor.userId()).subscribe(() => {
      this.heroes = Heroes.find({});
      this.checkIfServerTimeIsLoaded();
      // this.heroes.forEach(this.forEachAddFinishedToCountdown.bind(this));
      // this.countdownHandle = Meteor.setInterval(this.count.bind(this), 1000);
    });
  }

  onResultReceivedFunction(err, res){
    if(err){
      alert(err);
    }else{
      this.now = res;
    }
  }

  checkIfServerTimeIsLoaded(){
    if(this.now !== undefined){
      this.heroes.forEach(this.forEachAddFinishedToCountdown.bind(this));
      if(Object.keys(this.countdown).length > 0){
        this.countdownHandle = Meteor.setInterval(this.count.bind(this), 1000);
      }
    } else {
      Meteor.setTimeout(this.checkIfServerTimeIsLoaded.bind(this), 1000);
    }
  }

  forEachAddFinishedToCountdown(el){
    if(el.work.finishedAt){
      this.countdown[el._id] = ((el.work.finishedAt - this.now)/1000);
    }
  }

  count(){
    for(let key in this.countdown){
      this.countdown[key]--;
      if(this.countdown[key] < 0){
        delete this.countdown[key];
      }
    }
    if(Object.keys(this.countdown).length < 1){
      Meteor.clearInterval(this.countdownHandle);
    }
  }

  getFinishedAt(hero: Hero){
    return this.countdown[hero._id] + " seconds";
  }

  ngOnDestroy(){
    this.heroesSub.unsubscribe();
    Meteor.clearInterval(this.countdownHandle);
  }
}
