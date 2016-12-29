import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectListComponent} from "./project-list.component";
import {ProjectDetailComponent} from "./project-detail.component";

const routes: Routes = [

    { path: 'projects', redirectTo: '', pathMatch: 'full'},
    { path: '',   component: ProjectListComponent},
    { path: ':id', component: ProjectDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {}
