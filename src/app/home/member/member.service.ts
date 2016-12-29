import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {GlobalConstants} from '../common/constants/globals';

export class Member {
  constructor(
      public id : string,
      public firstName: string,
      public lastName: string,
      public email: string,
      public phone:string,
      public gender:string,
      public jobTitle:string,
      public salary:string,
      public salaryTerm:string,
      public hireDate:string,
      public role:string,
      public createdAt:string,
      public updatedAt:string) { }
}

let USERS = [
  new Member('', 'Mr. Ali','ali@gmail.com','123','male','','','','','','','','')
];

let usersPromise = Promise.resolve(USERS);

@Injectable()
export class MemberService {
  private baseApiUrl = GlobalConstants.BASE_API_URL;
  constructor(private http: Http) {}

  public getMembers() : Observable<Member[]>{
    let membersPath = this.baseApiUrl + 'members';
    let members = this.http.get(membersPath, {headers: this.getHeaders()})
        .map(res => <Member[]> res.json())
        .catch(this.handleError);
    return members;
  }

  public addMember(newMember) {
    var addMemberPath = this.baseApiUrl + 'member/add';
    return this.http.post(addMemberPath, newMember,{headers: this.getHeaders()})
        .catch(this.handleError);
  }

  public updateMember(id, updatedMember) {
    var addMemberPath = this.baseApiUrl + 'member/update/'+id;
    return this.http.put(addMemberPath, updatedMember,{headers: this.getHeaders()})
        .catch(this.handleError);
  }

  public deleteMember(id) {
    var deleteMemberPath = this.baseApiUrl + 'member/delete/'+id;
    return this.http.delete(deleteMemberPath,{headers: this.getHeaders()})
        .catch(this.handleError);
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  private handleError (error: any) {
    let errorMsg = error.message || ` Problem in Projects retrieving`
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }

  getUser(id: number | string) {
    return usersPromise
        .then(users => users.filter(user => user.id == id)[0]);
  }
}
