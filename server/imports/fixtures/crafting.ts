import { Meteor } from 'meteor/meteor';

import { Item } from '../../../both/models/item.model';
import { CraftingQueueItem } from '../../../both/models/craftingqueueitem.model';

import { Heroes } from '../../../both/collections/heroes.collection';
import { Inventories } from '../../../both/collections/inventories.collection';
import { Blueprints } from '../../../both/collections/blueprints.collection';

export class CraftingQueue {
  loopHandle: any;
  craftingQueue: CraftingQueueItem[];
  interval: number;

  constructor(){
    this.loopHandle = null;
    this.craftingQueue = [];
    this.interval = 500;
  }

  add(cqi: CraftingQueueItem){
    console.log("count before: " + this.craftingQueue.length);
    if(this.craftingQueue.length === 0){
      this.craftingQueue.push(cqi);
      this.loopHandle = Meteor.setInterval(this.checkForFinished.bind(this), this.interval);
    } else {
      let inserted = false;
      for(let i = 0; i < this.craftingQueue.length; i++){
        if(this.craftingQueue[i].timeOfCompletion > cqi.timeOfCompletion){
          this.craftingQueue.splice(i, 0, cqi),
          inserted = true;
          i = this.craftingQueue.length;
        }
      }
      if(!inserted){
        this.craftingQueue.push(cqi);
      }
    }
    console.log("count after: " + this.craftingQueue.length);
    if(this.craftingQueue.length < 1){
      Meteor.clearInterval(this.loopHandle);
    }
  }

  checkForFinished(): void{
    if(this.craftingQueue.length > 0){
      if(this.craftingQueue[0].timeOfCompletion < Date.now()){
        for(var i = 0; i < this.craftingQueue.length; i++){
          if(this.craftingQueue[i].timeOfCompletion < Date.now()){
            this.craftItem(this.craftingQueue[i]);
            this.craftingQueue.splice(0,1);
          } else {
            i = this.craftingQueue.length;
          }
        }
        console.log(this.craftingQueue.length + " items remaining");
      }
    }
  }

  craftItem(cqi: CraftingQueueItem): void {
    console.log("craft item " + cqi.item.name);
    Heroes.update( { _id:cqi.hid },
      { $set: { "work": {} } } );
    Inventories.update({uid: cqi.uid}, { $push: { "items": cqi.item} });
  }
}
