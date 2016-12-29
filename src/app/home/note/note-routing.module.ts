import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NoteListComponent} from "./note-list.component";
import {NoteDetailComponent} from "./note-detail.component";

const routes: Routes = [

  { path: 'notes', redirectTo: '', pathMatch: 'full'},
  { path: '',   component: NoteListComponent},
  { path: ':id', component: NoteDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule {}
