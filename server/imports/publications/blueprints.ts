import { Meteor } from 'meteor/meteor';
import { Blueprints } from '../../../both/collections/blueprints.collection';

Meteor.publish('blueprint', function(heroId: string){
  return Blueprints.find({hid: heroId});
});
