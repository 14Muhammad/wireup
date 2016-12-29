import { NgModule }     from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {AuthGuard} from "../core/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'prefix',
    children: [
      { path: 'dashboard', loadChildren: 'app/home/dashboard/dashboard.module#DashboardModule' },
      { path: 'projects', loadChildren: 'app/home/project/project.module#ProjectModule' },
      { path: 'clients', loadChildren: 'app/home/client/client.module#ClientModule' },
      { path: 'events', loadChildren: 'app/home/event/event.module#EventModule' },
      { path: 'notes', loadChildren: 'app/home/note/note.module#NoteModule' },
      { path: 'users', loadChildren: 'app/home/user/user.module#UserModule' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
