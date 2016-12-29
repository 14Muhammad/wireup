// Crazy copy of the app/user.service
// Proves that UserService is an app-wide singleton and only instantiated once
// IFF shared.module follows the `forRoot` pattern
//
// If it didn't, a new instance of UserService would be created
// after each lazy load and the userName would double up.

import { Injectable, Optional } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {GlobalConstants} from "../shared/constants/globals";
import {Observable} from "rxjs/Observable";
import {User} from "../home/user/user";

let nextId = 1;

export class UserServiceConfig {
  userName = 'Philip Marlowe';
}

@Injectable()
export class UserService {
  id = nextId++;
  private _userName = 'Sherlock Holmes';
  private baseApiUrl = GlobalConstants.BASE_API_URL;
  constructor(private http: Http,
              @Optional() config: UserServiceConfig) {
    if (config) {
      this._userName = config.userName;
    }
  }

  get userName() {
    // Demo: add a suffix if this service has been created more than once
    const suffix = this.id > 1 ? ` times ${this.id}` : '';
    return this._userName + suffix;
  }


  public getUsers() : Observable<User[]>{
    let usersPath = this.baseApiUrl + 'users';
    let users = this.http.get(usersPath, {headers: this.getHeaders()})
        .map(res => <User[]> res.json())
        .catch(this.handleError);
    return users;
  }

  public getUser(id) {
    var getUserPath = this.baseApiUrl + 'user/'+id;
    return this.http.get(getUserPath,{headers: this.getHeaders()})
        .map(res => <User> res.json())
        .catch(this.handleError);
  }

  public addUser(newUser) {
    var addUserPath = this.baseApiUrl + 'user/add';
    return this.http.post(addUserPath, newUser,{headers: this.getHeaders()})
        .map((res:Response) => res.json())
        .catch(this.handleError);
  }

  public updateUser(id, updatedUser) {
    var addUserPath = this.baseApiUrl + 'user/update/'+id;
    return this.http.put(addUserPath, updatedUser,{headers: this.getHeaders()})
        .map((res:Response) => res.json())
        .catch(this.handleError);
  }

  public deleteUser(id) {
    var deleteUserPath = this.baseApiUrl + 'user/delete/'+id;
    return this.http.delete(deleteUserPath,{headers: this.getHeaders()})
        .catch(this.handleError);
  }

  public isEmailExists(email){
    var isEmailExistsPath = this.baseApiUrl + 'user/isExists';
    return this.http.post(isEmailExistsPath,{email:email},{headers: this.getHeaders()})
        .map((res:Response) => res.json())
        .catch(this.handleError);
  }

  public isUsernameExists(userName){
    var isUsernameExistsPath = this.baseApiUrl + 'user/isUsernameExists';
    return this.http.post(isUsernameExistsPath,{userName:userName},{headers: this.getHeaders()})
        .map((res:Response) => res.json())
        .catch(this.handleError);
  }

  public login(user:User){
    var loginPath = this.baseApiUrl + 'user/login';
    return this.http.post(loginPath,{email:user.email,password:user.password},{headers: this.getHeaders()})
        .map((res:Response) => res.json())
        .catch(this.handleError);
  }

  public updatePassword(user:User){
    var updatePasswordPath = this.baseApiUrl + 'user/updatePassword';
    return this.http.post(updatePasswordPath,{email:user.email,password:user.password},{headers: this.getHeaders()})
        .map((res:Response) => res.json())
        .catch(this.handleError);
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  private handleError (error: any) {
    let errorMsg = error.message || ` Problem in retrieving`
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
