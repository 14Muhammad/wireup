import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Headers, Http} from "@angular/http";
import {GlobalConstants} from "../../shared/constants/globals";
export class Client {
    constructor(
        public id : string,
        public companyName : string,
        public address : string,
        public city: string,
        public state: string,
        public country: string,
        public phone: number,
        public online: boolean,
        public zip: number,
        public website: string,
        public VATNumber: string,
        public currency: string,
        public currencySymbol: string,
        public createdAt:string,
        public updatedAt:string
    ){}
}
@Injectable()
export class ClientService {
    private baseApiUrl = GlobalConstants.BASE_API_URL;
    constructor(private http: Http) {}
    public getClients() : Observable<Client[]> {
        let clientsPath = this.baseApiUrl + 'clients';
        let heroes = this.http.get(clientsPath, {headers: this.getHeaders()})
            .map(res => <Client[]> res.json())
            .catch(this.handleError);
        return heroes;
    }

    public addClient(newClient) {
        var addClientPath = this.baseApiUrl + 'client/add';
        return this.http.post(addClientPath, newClient,{headers: this.getHeaders()})
            .catch(this.handleError);
    }

    public updateClient(id, updatedClient) {
        var addClientPath = this.baseApiUrl + 'client/update/'+id;
        return this.http.put(addClientPath, updatedClient,{headers: this.getHeaders()})
            .catch(this.handleError);
    }

    public deleteClient(id) {
        var deleteClientPath = this.baseApiUrl + 'client/delete/'+id;
        return this.http.delete(deleteClientPath,{headers: this.getHeaders()})
            .catch(this.handleError);
    }
    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
    private handleError (error: any) {
        let errorMsg = error.message || ` Problem in Clients retrieving`
        console.error(errorMsg);
        return Observable.throw(errorMsg);
    }


}
