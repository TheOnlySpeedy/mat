import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { Heroes } from '../../../both/collections/heroes.collection';
import { Hero } from '../../../both/models/hero.model';

import { Item } from '../../../both/models/item.model';
import { Inventories } from '../../../both/collections/inventories.collection';
import { Blueprints } from '../../../both/collections/blueprints.collection';

import { INITHEROES, INITRESOURCES, INITBLUEPRINT } from './variables';

import { CraftingQueueItem } from '../../../both/models/craftingqueueitem.model';
import { CraftingQueue } from './crafting';

const myCraftingQueue = new CraftingQueue();

Meteor.methods({
  // return the current ServerTime to the user (used for countdowns)
  getServerTime: function () {
      var _time = Date.now();
      console.log(_time);
      return _time;
  },

  // creates DB-Entries for new users
  initializeNewUser: function(userId){
    console.log("initialize New User");
    console.log("create heroes");
    let heroes: Hero[] = INITHEROES;
    heroes.forEach((hero) => {
      let heroId = Random.id();
      hero._id = heroId;
      hero.uid = userId;
      Heroes.insert(hero);
      let bp = INITBLUEPRINT;
      bp.hid = heroId;
      Blueprints.insert(bp);
    });
    console.log("create inventory");
    let inventory = {uid: userId, stock: INITRESOURCES, items: [] };
    Inventories.insert(inventory);
  },

  // adds new Items to the Queue
  craftItem: function(heroId: string, craftItem: Item){
    console.log("craft a new Item");
    let startedAt = Date.now();
    console.log("hid: " + heroId + "; uid: " + this.userId + "; item: " + craftItem.name + "; startTime: " + startedAt);
    let cqi = {_id: Random.id(), hid: heroId, uid: this.userId, item: craftItem, timeOfCompletion: startedAt + craftItem.timeToCraft };
    console.log(cqi);
    myCraftingQueue.add(cqi);
    Heroes.update( { _id:cqi.hid }, 
      { $set: {
        "work.desc": cqi.item.name,
        "work.startedAt": startedAt,
        "work.finishedAt": cqi.timeOfCompletion } 
      } 
    );
    return cqi.timeOfCompletion;
  }
});
