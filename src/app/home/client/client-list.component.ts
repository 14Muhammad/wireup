import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';
import { Client, ClientService }   from './client.service';
@Component({
    templateUrl : './client-list.component.html',
    providers: [ClientService]
})
export class ClientListComponent implements OnInit {
    clients: Client[];
    constructor(private router: Router,
        private service: ClientService) {

    }

    dxDataGird = {
        columns:[
            {
                dataField: "id",
                caption: "ID",
                visible: false
            },
            {
                dataField: "companyName",
                caption: "Company Name"
            },
            {
                dataField: "address",
                caption: "Address"
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
                addRow: 'Add a projectModel'
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
            this.service.addClient(e.data)
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
            this.service.updateClient(e.oldData._id, e.newData)
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
            this.service.deleteClient(e.data._id)
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
        this.service.getClients()
            .subscribe(clients => this.clients = clients);
    }
    onSelect(hero: Client) {
        this.router.navigate(['/client', hero.id]);
    }
}
