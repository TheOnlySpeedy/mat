import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';

import { Inventory } from '../../../both/models/inventory.model';
import { Inventories } from '../../../both/collections/inventories.collection';

import template from './inventory.component.html';

@Component({
  selector: 'my-inventory',
  template
})
export class InventoryComponent implements OnInit, OnDestroy {
  inventories: Observable<Inventory[]>;
  inventorySub: Subscription;

  ngOnInit(): void {
    if(this.inventorySub){
      this.inventorySub.unsubscribe();
    }

    this.inventorySub = MeteorObservable.subscribe('inventory', Meteor.userId()).subscribe(() => {
      console.log("subscribe to inventory");
      this.inventories = Inventories.find({uid: Meteor.userId()});
    });
  }

  ngOnDestroy(){
    this.inventorySub.unsubscribe();
  }
}
