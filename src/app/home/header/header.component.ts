import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../core/auth.service";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls:[]
})

export class HeaderComponent implements OnInit {
  loggedUserName:string;
  loggedUser:string;
  constructor(public authService: AuthService,
              private cookieService:CookieService,
              private router: Router){

  }
  ngOnInit(): void {
    this.loggedUser =  JSON.parse(localStorage.getItem('loggedUser')).email;
    this.loggedUserName = localStorage.getItem('loggedUserName')
  }

  logout() {
    //this.cookieService.remove('username');
    this.cookieService.remove('email');
    this.cookieService.remove('password');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile(){
    this.router.navigate(['/users', this.loggedUserName]);
  }

}
