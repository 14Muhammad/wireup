import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientListComponent} from "./client-list.component";
import {ClientDetailComponent} from "./client-detail.component";

const routes: Routes = [

  { path: 'clients', redirectTo: '', pathMatch: 'full'},
  { path: '',   component: ClientListComponent},
  { path: ':id', component: ClientDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
