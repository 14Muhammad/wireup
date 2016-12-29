import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'reset-password', loadChildren: 'app/reset-password/reset-password.module#ResetPasswordModule' },
  { path: 'signup', loadChildren: 'app/signup/signup.module#SignupModule' },
  /*{ path: 'home', loadChildren: 'app/home/home.module#HomeModule' },*/
/*  { path: 'crisis', loadChildren: 'app/crisis/crisis.module#CrisisModule' },
  { path: 'contact', loadChildren: 'app/contact/contact.module#ContactModule' },
  { path: 'heroes', loadChildren: 'app/hero/hero.module#HeroModule' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
