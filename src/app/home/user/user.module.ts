import {NgModule, CUSTOM_ELEMENTS_SCHEMA}           from '@angular/core';

import {UserListComponent} from "./user-list.component";
import {UserDetailComponent} from "./user-detail.component";
import {UserRoutingModule} from "./user-routing.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  imports:      [ SharedModule, UserRoutingModule],
  declarations: [ UserListComponent,UserDetailComponent]
})
export class UserModule { }
