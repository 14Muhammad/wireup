import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';
import {ResetPasswordComponent} from "./reset-password.component";
import {ResetPasswordRoutingModule} from "./reset-password-routing.module";



@NgModule({
  imports:      [ SharedModule, ResetPasswordRoutingModule ],
  declarations: [ ResetPasswordComponent ],
  providers:    [  ]
})
export class ResetPasswordModule { }
