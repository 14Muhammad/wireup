import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';
import {SignupRoutingModule} from "./signup-routing.module";
import {SignupComponent} from "./signup.component";



@NgModule({
  imports:      [ SharedModule, SignupRoutingModule ],
  declarations: [ SignupComponent ],
  providers:    [  ]
})
export class SignupModule { }
