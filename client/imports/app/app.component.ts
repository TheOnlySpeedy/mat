import { Component } from '@angular/core';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { Router } from '@angular/router';

import template from './app.component.html';
import style from './app.component.scss';

@Component({
  selector: 'app',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class AppComponent {
  title = "My own App";

  constructor(private router: Router){}

  logout(){
    Meteor.logout();
    this.router.navigate(['/login']);
  }
}
