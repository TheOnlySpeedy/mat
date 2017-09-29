import { Meteor } from 'meteor/meteor';
import { Inventories } from '../../../both/collections/inventories.collection';

Meteor.publish('inventory', function(userId: string){
  return Inventories.find({uid: userId});
});
