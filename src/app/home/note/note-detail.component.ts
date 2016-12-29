import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import {NoteService, Note} from "./note.service";
@Component({
    template: `
  <h2>Notes</h2>
  `,
    providers: [NoteService]
})
export class NoteDetailComponent implements OnInit, OnDestroy  {
    note: Note;
    private sub: any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: NoteService) {

    }
    ngOnInit() {

    }
    ngOnDestroy() {

    }
    gotoNotes() { this.router.navigate(['/notes']); }
}
