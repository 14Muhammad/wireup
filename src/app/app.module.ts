import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

/* App Root */
import { AppComponent }   from './app.component';

/* Feature Modules */
//import { ContactModule }    from './contact/contact.module';
import { CoreModule }       from './core/core.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
import {LoginModule} from "./login/login.module";
import {HomeModule} from "./home/home.module";

@NgModule({
  imports: [
    BrowserModule,
    //ContactModule,
    HomeModule,
    //UserModule,
    LoginModule,
    /*
     CoreModule,
     */
    CoreModule.forRoot({userName: 'Ali Makhdoom'}),
    AppRoutingModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */