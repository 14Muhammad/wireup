import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
@Component({
    template: `
  <h2>Events</h2>
  <div *ngIf="event">
    <h3>"{{event.name}}"</h3>
    <div>
      <label>Id: </label>{{event.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="event.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="goToEvents()">Back</button>
    </p>
  </div>
  `
})
export class EventDetailComponent  {
    event: Event;
    private sub: any;
    constructor(
        private route: ActivatedRoute,
        private router: Router) {

    }

    goToEvents() { this.router.navigate(['/events']); }
}
