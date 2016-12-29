import {
    Component,
    OnInit,
    OnDestroy,
    trigger,
    state,
    style,
    transition,
    animate} from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import {User} from "./user";
import {Observable} from "rxjs/Rx";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../core/user.service";

@Component({
    templateUrl:'./user-detail.component.html',
    styleUrls:['./user-detail.component.css'],
    animations: []
})
export class UserDetailComponent implements OnInit, OnDestroy  {
    user: User;
    userName:string;
    userForm:FormGroup;
    projects:number;
    hours:number;

    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder:FormBuilder,
        private service: UserService) {

    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.userName = params['id'];
            this.service.getUser(this.userName)
                .subscribe(user => {
                    this.user = user;
                    this.userForm.controls['firstName'].setValue(this.user.firstName);
                    this.userForm.controls['lastName'].setValue(this.user.lastName);
                    this.userForm.controls['mailingAddress'].setValue(this.user.mailingAddress);
                    this.userForm.controls['altMailingAddress'].setValue(this.user.altMailingAddress);
                    this.userForm.controls['phone'].setValue(this.user.phone);
                    this.userForm.controls['altPhone'].setValue(this.user.altPhone);
                    this.userForm.controls['skypeId'].setValue(this.user.skypeId);
                    this.userForm.controls['dob'].setValue(this.user.dob);
                    this.userForm.controls['ssn'].setValue(this.user.ssn);

                    this.userForm.controls['facebook'].setValue(this.user.facebook);
                    this.userForm.controls['twitter'].setValue(this.user.twitter);
                    this.userForm.controls['linkedin'].setValue(this.user.linkedin);
                    this.userForm.controls['youtube'].setValue(this.user.youtube);
                    this.userForm.controls['github'].setValue(this.user.github);

                });
        });

        this.userForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            mailingAddress: ['', []],
            altMailingAddress: ['', []],
            phone: [null, []],
            altPhone: [null, []],
            skypeId: ['', []],
            dob: [null, []],
            ssn: [null, []],
            facebook: [null, []],
            linkedin: [null, []],
            twitter: [null, []],
            github: [null, []],
            youtube: [null, []]

        });

        Observable.interval(100)
            .take(10).map((x) => x+1)
            .subscribe((x) => {
                this.projects = x;
                this.hours = x*3/2;
            });
    }

    ngOnDestroy(): void {
    }

    updateUser(){

        var updateUserData = {
            firstName : this.userForm.controls['firstName'].value,
            lastName : this.userForm.controls['lastName'].value,
            mailingAddress : this.userForm.controls['mailingAddress'].value,
            altMailingAddress : this.userForm.controls['altMailingAddress'].value,
            phone : this.userForm.controls['phone'].value,
            altPhone : this.userForm.controls['altPhone'].value,
            skypeId : this.userForm.controls['skypeId'].value,
            dob : this.userForm.controls['dob'].value,
            ssn : this.userForm.controls['ssn'].value,
            facebook : this.userForm.controls['facebook'].value,
            twitter : this.userForm.controls['twitter'].value,
            linkedin : this.userForm.controls['linkedin'].value,
            github : this.userForm.controls['github'].value,
            youtube : this.userForm.controls['youtube'].value

        }
        //this.snackBar.open('It didn\'t quite work!', 'Try Again');
        this.service.updateUser(this.user._id,updateUserData)
            .subscribe(response => {
                /**
                 * @param response              Information about the object.
                 * @param response.isUserUpdated   Information about the object's members.
                 */

                if(response.isUserUpdated){
                    //this.snackBar.open('User Updated!', 'Congrats');
                }
            });
    }

}
