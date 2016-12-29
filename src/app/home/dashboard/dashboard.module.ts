import { NgModule }           from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {TimerComponent} from "./timer/timer.component";



@NgModule({
  imports:      [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [ DashboardComponent,TimerComponent ],
  providers:    [  ]
})
export class DashboardModule { }
