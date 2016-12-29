import { NgModule }           from '@angular/core';
import {ProjectRoutingModule} from "./project-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ProjectListComponent} from "./project-list.component";
import {ProjectDetailComponent} from "./project-detail.component";
import {ProjectService} from "./project.service";

@NgModule({
    imports:      [ SharedModule, ProjectRoutingModule ],
    declarations: [ ProjectListComponent,ProjectDetailComponent ],
    providers:    [ ProjectService ]
})
export class ProjectModule { }
