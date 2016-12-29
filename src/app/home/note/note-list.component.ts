import {Component, OnInit, ViewChild}   from '@angular/core';
import { Router }              from '@angular/router';
import {NoteService, Note} from "./note.service";
import {GlobalConstants} from "../../shared/constants/globals";
@Component({
  templateUrl:'./note-list.component.html',
  styleUrls:['./note-list.component.css'],
  providers: [NoteService]
})
export class NoteListComponent implements OnInit {
  notes: Note[];
  toolbarTheme:string;
  constructor(private router: Router,private service: NoteService) {
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
        addRow: 'Add note'
      },
      form: {
        alignItemLabels: true,
        showColonAfterLabel: true,
        showOptionalMark: false,
        showRequiredMark: true,
        showValidationSummary: true,
        onContentReady: (e) => {
          console.log("Form => onContentReady");
          console.log(e);
        }
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
      fileName:'Notes',
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
      this.service.addNote(e.data)
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
      this.service.updateNote(e.oldData._id, e.newData)
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
      this.service.deleteNote(e.data._id)
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
    this.service.getNotes()
      .subscribe(notes => this.notes = notes);
  }
  onSelect(note: Note) {
    this.router.navigate(['/note', note.id]);
  }

}

