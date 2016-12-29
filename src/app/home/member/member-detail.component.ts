import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';

import { Member, MemberService } from './member.service';

@Component({
  template: `
  <h2>Users</h2>
  <div *ngIf="user">
    <h3>"{{user.name}}"</h3>
    <div>
      <label>Id: </label>{{user.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="user.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoUsers()">Back</button>
    </p>
  </div>
  `,
  providers:[MemberService]
})
export class MemberDetailComponent implements OnInit, OnDestroy  {
  user: Member;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MemberService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       let id = params['id']; // (+) converts string 'id' to a number
       this.service.getUser(id).then(user => this.user = user);
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoUsers() {
    let userId = this.user ? this.user.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    this.router.navigate(['/members'], { queryParams: { id: `${userId}`, foo: 'foo' } });
  }
}
