import { Component }   from '@angular/core';
import {Router}   from '@angular/router';
/*import {SidebarComponent} from "../common/sidebar/sidebar.component";
import {HeaderComponent} from "../common/header/header.component";*/

@Component({
    templateUrl: 'app/home/home.component.html',
    styleUrls: [],
    providers:[]
})
export class HomeComponent {
    constructor(public router: Router) {
        //this.router.navigate(['/projects']);
    }

}