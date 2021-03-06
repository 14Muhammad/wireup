import {Component, OnInit, ViewChild}   from '@angular/core';
import { Router }              from '@angular/router';
import {ProjectService, Project} from "./project.service";
import {GlobalConstants} from "../../shared/constants/globals";
@Component({
  templateUrl:'./project-list.component.html',
  styleUrls:['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  toolbarTheme;
  constructor(private router: Router,private service: ProjectService) {
    this.toolbarTheme = GlobalConstants.TOOLBAR_THEME;

  }

  dxDataGird = {
    columns:[
      {
        dataField: "id",
        caption: "ID",
        visible: false
      },
      {
        dataField: "name",
        caption: "Title"
      },
      {
        dataField: "client",
        caption: "Client"
      },
      {
        dataField: "price",
        caption: "Price",
        format: {
          type: 'currency',
          currency: 'USD',
          precision:2
        },
        alignment: 'left'
      },
      {
        dataField: "startTime",
        caption: "Start Time",
        dataType: "date",
        format: { type: 'shortDateShortTime' }
      },
      {
        dataField: "endTime",
        caption: "Deadline",
        dataType: "date",
        format: { type: 'shortDateShortTime' }
      },
      {
        dataField: "progress",
        caption: "Progress",
        dataType: "number",
      },
      {
        dataField: "status",
        caption: "Status"
      },
      {
        dataField: "labels",
        caption: "Labels"
      },
      {
        dataField: "description",
        caption: "Description"
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
        addRow: 'Add project'
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
      this.service.addProject(e.data)
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
      this.service.updateProject(e.oldData._id, e.newData)
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
      this.service.deleteProject(e.data._id)
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





  //@ViewChild(DxDataGrid) dataGrid:DxDataGrid
  refresh() {
    //this.dataGrid.instance.refresh();
  }
  ngOnInit() {
    this.service.getProjects()
      .subscribe(projects => this.projects = projects);
  }
  onSelect(project: Project) {
    this.router.navigate(['/project', project.id]);
  }

}

