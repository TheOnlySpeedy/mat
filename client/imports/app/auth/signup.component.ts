import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';

import { Heroes } from '../../../../both/collections/heroes.collection';

import template from './signup.component.html';

@Component({
  selector: 'signup',
  template
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error: string;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit() {
    if(Meteor.userId()){
      this.router.navigate(['/dashboard']);
    }
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  signup() {
    if (this.signupForm.valid) {
      try{
        Accounts.createUser({
          email: this.signupForm.value.email,
          password: this.signupForm.value.password
        }, (err) => {
          if(err) {
            this.zone.run(() => {
              this.error = err;
            });
          } else {
            Meteor.call("initializeNewUser", Meteor.userId(),
              (err, res) => {
                if(err) {
                  alert(err);
                } else {
                  this.router.navigate(['/story']);
                }
              }
            );
          }
        });
      } catch (err){
        alert("exception: " + err);
      }
    }
  }
}
