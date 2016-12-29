import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Client, ClientService } from './client.service';
@Component({
    templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnInit, OnDestroy  {
    client: Client;
    private sub: any;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: ClientService) {

    }
    ngOnInit() {
        /*this.service.getClient(id)
            .subscribe(client => this.client = client);*/
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    gotoClients() { this.router.navigate(['/clients']); }
}
