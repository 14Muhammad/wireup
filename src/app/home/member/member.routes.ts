import {RouterModule, Routes}          from '@angular/router';
import {MemberListComponent} from "./member-list.component";
import {MemberDetailComponent} from "./member-detail.component";

export const MemberRoutes: Routes = [
  { path: 'members',  component: MemberListComponent },
  { path: 'member/:id', component: MemberDetailComponent }
];
export const MemberRouting = RouterModule.forChild(MemberRoutes);