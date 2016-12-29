import { Component }   from '@angular/core';
import { Router }   from '@angular/router';
import {FormGroup, Validators, FormBuilder, FormControl, FormArray} from "@angular/forms";
import {Observable} from "rxjs";
import {UserService} from "../core/user.service";
import {AuthService} from "../core/auth.service";



@Component({
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

    resetPasswordForm: FormGroup;

    constructor(public authService: AuthService,
                private formBuilder:FormBuilder,
                public userService: UserService,
                public router: Router){

    }

    ngOnInit():any {
        this.resetPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ],this.asyncEmailValidator(this.userService)],
            'newPasswords': this.formBuilder.group({
                'newPassword': ['', [
                    Validators.required,
                    Validators.minLength(6)
                ]],
                'confirmNewPassword': ['', [Validators.required]]
            }, {
                validator: this.areEqual
            })
        });
        this.resetPasswordForm.valueChanges
            .subscribe((data: any) => {
                    console.log("valueChanges")
                    console.info(data)
                    console.info(this.resetPasswordForm)
                }
            );
    }

    asyncEmailValidator (userService : UserService) {
        return (control: FormControl): Promise<any> | Observable<any> => {
            let promise = new Promise<any>(
                (resolve, reject) => {
                    userService.isEmailExists(control.value)
                        .subscribe(response => {
                            /**
                             * @param response              Information about the object.
                             * @param response.isEmailExists   Information about the object's members.
                             */
                            if(!response.isEmailExists)
                                resolve({'isEmailExists': false});
                            else
                                resolve(null);
                        });
                });
            return promise;
        }
    }

    areEqual(group: FormArray) {
        let val;
        let valid = true;
        for (let name in group.controls) {
            if (val === undefined) {
                val = group.controls[name].value
            } else {
                if (val !== group.controls[name].value) {
                    valid = false;
                    break;
                }
            }
        }
        if (valid)
            return null;
        return {
            areEqual: true
        };
    }
    goToLogin(){
        this.router.navigate(['/login']);
    }

    resetPassword(){
        var formData : any = {
            email: this.resetPasswordForm.value.email,
            password: this.resetPasswordForm.value.newPasswords.newPassword
        };
        this.userService.updatePassword(formData)
            .subscribe(response => {
                /**
                 * @param response              Information about the object.
                 * @param response.isPasswordUpdated   Information about the object's members.
                 */
                if(response.isPasswordUpdated){
                    this.router.navigate(['/login']);
                }
            });
    }
}
