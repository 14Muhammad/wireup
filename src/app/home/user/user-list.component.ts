import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


import {User} from "./user";
import {AuthService} from "../../core/auth.service";
import {UserService} from "../../core/user.service";
import {GlobalConstants} from "../../shared/constants/globals";


@Component({
  templateUrl : './user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];

  private selectedId: string;
  private sub: any;
  toolbarTheme:string;
  constructor(private service: UserService, public authService: AuthService, public router: Router){
    this.toolbarTheme = GlobalConstants.TOOLBAR_THEME;
    /*if (!this.authService.isLoggedIn)
     this.router.navigate(['/login']);*/
  }

  dxDataGird = {
    columns:[
      {
        dataField: "id",
        caption: "ID",
        visible: false
      },
      {
        dataField: "firstName",
        caption: "First Name"
      },
      {
        dataField: "lastName",
        caption: "Last Name"
      },
      {
        dataField: "jobTitle",
        caption: "Job Title"
      },
      {
        dataField: "email",
        caption: "Email"
      },
      {
        dataField: "phone",
        caption: "Phone"
      }
    ],
    columnFixing: {
      enabled: true
    },
    columnHidingEnabled: false,
    allowColumnResizing : true,
    hoverStateEnabled : false,
    allowColumnReordering : true,
    rowAlternationEnabled : true,
    selection : {
      mode: 'single'
    },
    groupPanel : {
      visible: true
    },
    filterRow : {
      visible: true,
      applyFilter: 'auto'
    },
    searchPanel:{
      visible: true
    },
    editing: {
      mode: 'form',
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: true,
      texts:{
        addRow: 'Add user'
      }
    },
    paging: {
      pageSize: 12
    },
    pager : {
      showInfo: true,
      showNavigationButtons: true,
      showPageSizeSelector: true
    },
    export : {
      enabled: true,
      fileName:'Projects',
      allowExportSelectedData: true
    },
    onEditingStart (e) {
      console.log("onEditingStart");
      console.log(e);
    },
    onCellPrepared (e) {
      console.log("onCellPrepared");
      console.log(e);
      if(e.value === ''){
        e.cellElement.addClass('emptyCell');
      }
    },
    onRowPrepared(e){
      console.log("onRowPrepared");
      console.log(e);
    },
    onRowInserting : (e)=>{
      console.log("onRowInserting");
      console.log(e);
      var flag : boolean;
      this.service.addUser(e.data)
        .subscribe(flag => flag = flag);
    },
    onRowInserted(e){
      console.log("onRowInserted");
      console.log(e);
    },
    onRowUpdating : (e)=>{
      console.log("onRowUpdating");
      console.log(e);
      var flag : boolean;
      this.service.updateUser(e.oldData._id, e.newData)
        .subscribe(flag => flag = flag);
    },
    onRowUpdated : (e)=>{
      console.log("onRowUpdated");
      console.log(e);
    },
    onRowRemoving : (e)=>{
      console.log("onRowRemoving");
      console.log(e);
      var flag: boolean;
      this.service.deleteUser(e.data._id)
        .subscribe(flag => flag = flag);
    },
    onRowRemoved : (e)=>{
      console.log("onRowRemoved");
      console.log(e);
    },
    onContextMenuPreparing(e){
      console.log("onRowPrepared");
      console.log(e);
      if (e.row.rowType === 'data') {
        e.items = [{
          text: "Edit",
        }, {
          text: "Insert",
        }, {
          text: "Delete",
        }];
      }
    },
    onDataErrorOccurred(e){
      console.log("onDataErrorOccurred");
      console.log(e);
    },
    onContentReady(e){
      console.log("onContentReady");
      console.log(e);
    }
  }
  ngOnInit() {
    this.service.getUsers()
      .subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    //this.service.getUsers()
  }

  isSelected(user: User) { return user._id == this.selectedId; }

  onSelect(user: User) {
    this.router.navigate(['/user', user._id]);
  }

}
