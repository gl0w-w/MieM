import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { addIcons } from 'ionicons';
import {
  person,
  personCircle,
  briefcase,
} from 'ionicons/icons';

addIcons({
  person,
  personCircle,
  briefcase
});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    defineCustomElements(window);
  }
}
