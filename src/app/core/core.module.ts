/* tslint:disable:member-ordering no-unused-variable */
import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';

import { CommonModule }      from '@angular/common';

import { TitleComponent }    from './title.component';
import { UserService }       from './user.service';
import { UserServiceConfig } from './user.service';
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {CookieService} from "angular2-cookie/services/cookies.service";

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ TitleComponent ],
  exports:      [ TitleComponent ],
  providers:    [ UserService,AuthGuard, AuthService,CookieService ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: UserServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: UserServiceConfig, useValue: config },
      ]
    };
  }
}
