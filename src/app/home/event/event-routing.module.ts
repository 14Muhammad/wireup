import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventListComponent} from "./event-list.component";
import {EventDetailComponent} from "./event-detail.component";
import {EventService} from "./event.service";

const routes: Routes = [

  { path: 'events', redirectTo: '', pathMatch: 'full'},
  { path: '',   component: EventListComponent},
  { path: ':id', component: EventDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[EventService]
})
export class EventRoutingModule {}
