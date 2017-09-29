import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { CraftingComponent } from './crafting.component';
import { DashboardComponent } from './dashboard.component';
import { DetailComponent } from './detail.component';
import { StoryComponent } from './story.component';

import { LoginComponent }         from './auth/login.component';
import { SignupComponent }        from './auth/signup.component';
import { RecoverComponent }       from './auth/recover.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard',    component: DashboardComponent },
  { path: 'detail/:id',   component: DetailComponent },
  { path: 'crafting/:id', component: CraftingComponent },
  { path: 'story',        component: StoryComponent },

  { path: 'login',        component: LoginComponent },
  { path: 'signup',       component: SignupComponent },
  { path: 'recover',      component: RecoverComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
