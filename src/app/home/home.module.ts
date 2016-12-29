import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";

@NgModule({
    imports:      [ SharedModule, HomeRoutingModule ],
    declarations: [ HomeComponent,HeaderComponent,SidebarComponent ],
    providers:    [  ]
})
export class HomeModule { }
