import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule }   from './app-routing.module';
import { AUTH_DECLARATIONS }  from './auth/index';

import { AppComponent }       from './app.component';
import { CraftingComponent}   from './crafting.component';
import { DashboardComponent } from './dashboard.component';
import { DetailComponent }    from './detail.component';
import { InventoryComponent } from './inventory.component';
import { StoryComponent }     from './story.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CraftingComponent,
    DashboardComponent,
    DetailComponent,
    InventoryComponent,
    StoryComponent,
    ...AUTH_DECLARATIONS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
