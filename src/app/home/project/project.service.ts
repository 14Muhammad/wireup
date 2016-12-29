import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {GlobalConstants} from "../../shared/constants/globals";
export class Project {
    constructor(public id: string,
                public name: string,
                public client: string,
                public price:string,
                public startTime:string,
                public endTime:string,
                public progress: number,
                public status:string,
                public labels:string,
                public description:string,
                public createdAt:string,
                public updatedAt:string) { }
}
@Injectable()
export class ProjectService {
    private baseApiUrl = GlobalConstants.BASE_API_URL;
    constructor(private http: Http) {}

    public getProjects() : Observable<Project[]>{
        let projectsPath = this.baseApiUrl + 'projects';
        let heroes = this.http.get(projectsPath, {headers: this.getHeaders()})
            .map(res => <Project[]> res.json())
            .catch(this.handleError);
        return heroes;
    }
    public addProject(newProject) {
        var addProjectPath = this.baseApiUrl + 'project/add';
        return this.http.post(addProjectPath, newProject,{headers: this.getHeaders()})
            .catch(this.handleError);
    }

    public updateProject(id, updatedProject) {
        var addProjectPath = this.baseApiUrl + 'project/update/'+id;
        return this.http.put(addProjectPath, updatedProject,{headers: this.getHeaders()})
            .catch(this.handleError);
    }

    public deleteProject(id) {
        var deleteProjectPath = this.baseApiUrl + 'project/delete/'+id;
        return this.http.delete(deleteProjectPath,{headers: this.getHeaders()})
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

}
