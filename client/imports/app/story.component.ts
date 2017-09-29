import { Component } from '@angular/core';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { Meteor } from 'meteor/meteor';

import template from './story.component.html';

@Component({
  selector: 'my-story',
  template
})
@InjectUser('user')
export class StoryComponent {
  story: string;
  user: any;

  getStory(){
    this.story = "";
    if(this.user && this.user.profile){
      switch(this.user.profile.story){
        case 1:
          this.story += "A";
          break;
        case 2:
          this.story += "B";
          break;
        case 3:
          this.story += "C";
          break;
        case 4:
          this.story += "D";
          break;
        case 0:
          break;
        default:
          break;
        }
    }
    return this.story;
  }

}
