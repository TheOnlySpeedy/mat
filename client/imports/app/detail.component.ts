import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Heroes } from '../../../both/collections/heroes.collection';
import { Hero } from '../../../both/models/hero.model';

import template from './detail.component.html';

@Component({
  selector: 'my-detail',
  template
})
export class DetailComponent implements OnInit, OnDestroy {
  heroId: string;
  paramsSub: Subscription;
  hero: Hero;
  heroSub: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.paramsSub = this.route.params
      .map(params => params['id'])
      .subscribe(heroId => {
        this.heroId = heroId;

        if(this.heroSub){
          this.heroSub.unsubscribe();
        }

        this.heroSub = MeteorObservable.subscribe('hero', this.heroId, Meteor.userId()).subscribe(() => {
          this.hero = Heroes.findOne(this.heroId);
        });
      });
  }

  ngOnDestroy(){
    this.paramsSub.unsubscribe();
    this.heroSub.unsubscribe();
  }
}
