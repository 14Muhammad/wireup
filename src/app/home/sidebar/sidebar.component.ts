import {Component} from '@angular/core';

import { Router } from '@angular/router';


@Component({
    selector: 'sidebar-component',
    templateUrl: './sidebar.component.html',
    styleUrls:['./sidebar.component.css']
})

export class SidebarComponent {
    constructor( private router: Router){

    }

    isActive = false;
    showMenu: string = '';
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

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
}