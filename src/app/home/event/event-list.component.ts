import {Component, OnInit}   from '@angular/core';
import { Router } from '@angular/router';
import {Appointment, Resource, EventService} from "./event.service";
import {GlobalConstants} from "../../shared/constants/globals";
@Component({
  templateUrl:'./event-list.component.html',
  styleUrls:['./event-list.component.css']
})
export class EventListComponent  {
  events: Event[];
  appointmentsData: Appointment[];
  currentDate: Date = new Date(2015, 4, 25);
  resourcesData: Resource[];
  switchModeNames: string[];
  toolbarTheme:string;

  constructor(private router: Router,private eventService:EventService) {
    this.toolbarTheme = GlobalConstants.TOOLBAR_THEME;
    this.switchModeNames = ["Tabs", "Drop-Down Menu"];
    this.appointmentsData = eventService.getAppointments();
    this.resourcesData = eventService.getResources();

  }

  /*dxScheduler = {
    dataSource : [
      {
        text: "Website Re-Design Plan",
        ownerId: [4],
        startDate: new Date(2015, 4, 25, 9, 30),
        endDate: new Date(2015, 4, 25, 11, 30)
      }, {
        text: "Book Flights to San Fran for Sales Trip",
        ownerId: [2],
        startDate: new Date(2015, 4, 25, 12, 0),
        endDate: new Date(2015, 4, 25, 13, 0)
      }, {
        text: "Install New Router in Dev Room",
        ownerId: [1],
        startDate: new Date(2015, 4, 25, 14, 30),
        endDate: new Date(2015, 4, 25, 15, 30)
      }, {
        text: "Approve Personal Computer Upgrade Plan",
        ownerId: [3],
        startDate: new Date(2015, 4, 26, 10, 0),
        endDate: new Date(2015, 4, 26, 11, 0)
      }, {
        text: "Final Budget Review",
        ownerId: [1],
        startDate: new Date(2015, 4, 26, 12, 0),
        endDate: new Date(2015, 4, 26, 13, 35)
      }, {
        text: "New Brochures",
        ownerId: [4],
        startDate: new Date(2015, 4, 26, 14, 30),
        endDate: new Date(2015, 4, 26, 15, 45)
      }, {
        text: "Install New Database",
        ownerId: [2],
        startDate: new Date(2015, 4, 27, 9, 45),
        endDate: new Date(2015, 4, 27, 11, 15)
      }, {
        text: "Approve New Online Marketing Strategy",
        ownerId: [3, 4],
        startDate: new Date(2015, 4, 27, 12, 0),
        endDate: new Date(2015, 4, 27, 14, 0)
      }, {
        text: "Upgrade Personal Computers",
        ownerId: [2],
        startDate: new Date(2015, 4, 27, 15, 15),
        endDate: new Date(2015, 4, 27, 16, 30)
      }, {
        text: "Prepare 2015 Marketing Plan",
        ownerId: [1, 3],
        startDate: new Date(2015, 4, 28, 11, 0),
        endDate: new Date(2015, 4, 28, 13, 30)
      }, {
        text: "Brochure Design Review",
        ownerId: [4],
        startDate: new Date(2015, 4, 28, 14, 0),
        endDate: new Date(2015, 4, 28, 15, 30)
      }, {
        text: "Create Icons for Website",
        ownerId: [3],
        startDate: new Date(2015, 4, 29, 10, 0),
        endDate: new Date(2015, 4, 29, 11, 30)
      }, {
        text: "Upgrade Server Hardware",
        ownerId: [4],
        startDate: new Date(2015, 4, 29, 14, 30),
        endDate: new Date(2015, 4, 29, 16, 0)
      }, {
        text: "Submit New Website Design",
        ownerId: [1],
        startDate: new Date(2015, 4, 29, 16, 30),
        endDate: new Date(2015, 4, 29, 18, 0)
      }, {
        text: "Launch New Website",
        ownerId: [2],
        startDate: new Date(2015, 4, 29, 12, 20),
        endDate: new Date(2015, 4, 29, 14, 0)
      }, {
        text: "Stand-up meeting",
        ownerId: [1, 2, 3, 4],
        startDate: new Date(2015, 4, 25, 9, 0),
        endDate: new Date(2015, 4, 25, 9, 15),
        recurrenceRule: "FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR;UNTIL=20150530"
      }
    ],
    views: ["agenda", "month", "week", "workWeek", "day"],
    currentView: "workWeek",
    currentDate: new Date(2015, 4, 25),
    useDropDownViewSwitcher: false,
    firstDayOfWeek: 0,
    startDayHour: 8,
    endDayHour: 19,
    /!*resources: [{
     field: "ownerId",
     label: "Owner",
     allowMultiple: true,
     dataSource: resourcesData
     }],*!/
    width: "100%",
    height: 600
  }*/





}

