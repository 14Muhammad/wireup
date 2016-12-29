import { NgModule }           from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {NoteRoutingModule} from "./note-routing.module";
import {NoteDetailComponent} from "./note-detail.component";
import {NoteListComponent} from "./note-list.component";
import {NoteService} from "./note.service";
@NgModule({
  imports:      [ SharedModule, NoteRoutingModule ],
  declarations: [ NoteListComponent,NoteDetailComponent ],
  providers:    [ NoteService ]
})
export class NoteModule { }
