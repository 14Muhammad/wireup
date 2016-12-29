import { NgModule }           from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {ClientRoutingModule} from "./client-routing.module";
import {ClientListComponent} from "./client-list.component";
import {ClientDetailComponent} from "./client-detail.component";
import {ClientService} from "./client.service";
@NgModule({
  imports:      [ SharedModule, ClientRoutingModule ],
  declarations: [ ClientListComponent,ClientDetailComponent ],
  providers:    [ ClientService ]
})
export class ClientModule { }
