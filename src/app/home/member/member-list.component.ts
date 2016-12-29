import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Member, MemberService }   from './member.service';
import {AuthService} from "../auth.service";

@Component({
  templateUrl : 'app/member/member-list.component.html',
  providers:[MemberService]
})
export class MemberListComponent implements OnInit, OnDestroy {
  members: Member[];

  private selectedId: string;
  private sub: any;
  constructor(private service: MemberService, public authService: AuthService, public router: Router){
    if (!this.authService.isLoggedIn)
      this.router.navigate(['/login']);
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
        addRow: 'Add member'
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
      this.service.addMember(e.data)
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
      this.service.updateMember(e.oldData._id, e.newData)
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
      this.service.deleteMember(e.data._id)
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
    this.service.getMembers()
        .subscribe(users => this.members = users);
  }

  ngOnDestroy() {
    //this.service.getMembers()
  }

  isSelected(user: Member) { return user.id == this.selectedId; }

  onSelect(user: Member) {
    this.router.navigate(['/member', user.id]);
  }

}
