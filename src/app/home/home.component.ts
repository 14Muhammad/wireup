import {Component, OnInit}   from '@angular/core';
import {Router}   from '@angular/router';
import {AuthService} from "../core/auth.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
/*import {SidebarComponent} from "../common/sidebar/sidebar.component";
import {HeaderComponent} from "../common/header/header.component";*/

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedUserName:string;
  loggedUser:string;

  sidebarItems = [
    {
      name: 'Dashboard',
      icon: 'desktop',
      route: "dashboard",
      class: 'list-group-item'
    },
    /*{
     name: 'Timeline',
     icon: 'comments',
     route: "dashboard",
     class: 'list-group-item'
     },*/
    {
      name: 'Events',
      icon: 'calendar',
      route: "events",
      class: 'list-group-item'

    },{
      name: 'Notes',
      icon: 'book',
      route: "notes",
      class: 'list-group-item'
    },
    /*{
     name: 'Messages',
     icon: 'envelope',
     route: "messages",
     class: 'list-group-item'
     },*/
    {
      name: 'Clients',
      icon: 'briefcase',
      route: "clients",
      class: 'list-group-item'
    },{
      name: 'Projects',
      icon: 'th-large',
      route: "projects",
      class: 'list-group-item'
    },{
      name: 'Team Members',
      icon: 'users',
      route: "members",
      class: 'list-group-item'
    },{
      name: 'Users',
      icon: 'user',
      route: "users",
      class: 'list-group-item'
    }/*,{
     name: 'Todos',
     icon: 'list-alt',
     route: "todos",
     class: 'list-group-item'
     }*/]

    constructor(public authService: AuthService,
                private cookieService:CookieService,
                private router: Router) {
        //this.router.navigate(['/projects']);
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