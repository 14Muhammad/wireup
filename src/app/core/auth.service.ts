import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

import {UserService} from "./user.service";
import {User} from "../home/user/user";

@Injectable()
export class AuthService{



    isLoggedIn: boolean = false;

    constructor(private http: Http,
                public router: Router,
                public userService:UserService){
    }

    login(user: User) {
        return this.userService.login(user);
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('loggedUser');
    }
}
