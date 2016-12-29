import {NgModule, CUSTOM_ELEMENTS_SCHEMA}           from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {EventRoutingModule} from "./event-routing.module";
import {EventListComponent} from "./event-list.component";
import {EventDetailComponent} from "./event-detail.component";



@NgModule({
  imports:      [ SharedModule, EventRoutingModule ],
  declarations: [ EventListComponent,EventDetailComponent ],
  providers:    [  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EventModule {

}
