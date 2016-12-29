import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import {UserListComponent} from "./user-list.component";
import {UserDetailComponent} from "./user-detail.component";


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'users', redirectTo: '', pathMatch: 'full'},
    { path: '',  component: UserListComponent },
    { path: ':id', component: UserDetailComponent }
  ])],
  exports: [RouterModule]
})
export class UserRoutingModule {}
