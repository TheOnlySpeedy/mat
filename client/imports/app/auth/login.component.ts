import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { FormsModule }        from '@angular/forms';

import template from './login.component.html';

@Component({
  selector: 'login',
  template
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit(){
    if(Meteor.userId()){
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  login(){
    if(this.loginForm.valid){
      Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
        if(err){
          this.zone.run(() => {
            this.error = err;
          });
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
