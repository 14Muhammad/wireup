import { Component } from '@angular/core';
import {UserService} from "./core/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  subtitle = '(Final)';
  photo = './assets/images/AngularJS.jpg';
  isLoggedIn:boolean;
  constructor(private userService:UserService){
      //this.isLoggedIn = userService.isLoggedIn;
  }
}
