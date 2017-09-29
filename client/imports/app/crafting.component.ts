import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Item } from '../../../both/models/item.model';

import { Heroes } from '../../../both/collections/heroes.collection';
import { Hero } from '../../../both/models/hero.model';

import { Blueprints } from '../../../both/collections/blueprints.collection';
import { Blueprint } from '../../../both/models/blueprint.model';

import template from './crafting.component.html';

@Component({
  selector: 'my-crafting',
  template
})
export class CraftingComponent implements OnInit, OnDestroy {
  heroId: string;
  paramsSub: Subscription;
  heroes: Observable<Hero[]>;
  heroSub: Subscription;
  blueprint: Blueprint;
  blueprintSub: Subscription;

  blueprintItems: Item[];
  selectedItem: Item;

  constructor(
    private route: ActivatedRoute,
    private _ngZone: NgZone
  ) {
    this.blueprintItems = [];
  }

  ngOnInit(): void{
    this.paramsSub = this.route.params
      .map(params => params['id'])
      .subscribe(heroId => {
        this.heroId = heroId;

        if(this.heroSub){
          this.heroSub.unsubscribe();
        }
        if(this.blueprintSub){
          this.blueprintSub.unsubscribe();
        }
        
        this.heroSub = MeteorObservable.subscribe('hero', this.heroId, Meteor.userId()).subscribe(() => {
          this.heroes = Heroes.find(this.heroId);
        });

        this.blueprintSub = MeteorObservable.subscribe('blueprint', this.heroId).subscribe(() => {
          this.blueprint = Blueprints.findOne({hid: this.heroId});
          this.loadBlueprintItems();
          this.onSelect(this.blueprint.items[0]);
        });
      });
  }

  loadBlueprintItems(): void {
    for(let item of this.blueprint.items){
      this.blueprintItems.push(item);
      if(item.children && item.children !== null){
        this.getItemChildren(item);
      }
    }
  }

  getItemChildren(item: Item): void {
    let level = item.level;
    for(let child in item.children){
      if(level >= parseInt(child)){
        let childItem = item.children[child];
        this.blueprintItems.push(childItem);
        if(childItem.children && childItem.children !== null){
          this.getItemChildren(childItem);
        }
      }
    }
  }

  onSelect(item: Item): void {
    let sItem = item;
    delete sItem['children'];
    this.selectedItem = sItem;
  }

  craftItem(){
    console.log("craft item " + this.selectedItem.name);
    Meteor.call('craftItem', this.heroId, this.selectedItem,
      (err, res) => {
        if(err) {
          alert(err);
        } else {
          this._ngZone.run(() => {
            console.log("item added to queue");
          });
        }
      }
    );
  }

  ngOnDestroy(){
    this.paramsSub.unsubscribe();
    this.heroSub.unsubscribe();
    this.blueprintSub.unsubscribe();
  }
}
