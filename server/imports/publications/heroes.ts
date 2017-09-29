import { Meteor } from 'meteor/meteor';
import { Heroes } from '../../../both/collections/heroes.collection';

Meteor.publish('userheroes', function(userId: string){
  return Heroes.find({uid: userId});
});

Meteor.publish('hero', function(heroId: string, userId: string){
  return Heroes.find({_id: heroId, uid: userId});
});
