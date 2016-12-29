import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Component, OnInit}   from '@angular/core';
import { Router }      from '@angular/router';
import {UserService} from "../core/user.service";
import {AuthService} from "../core/auth.service";
import {CookieService} from "angular2-cookie/services/cookies.service";


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  photo = './assets/images/AngularJS.jpg';
  iconColorTheme = '#3f51b5';
  // @HostBinding('body:style.background-image') image = '';

  constructor(public authService: AuthService,
              private formBuilder:FormBuilder,
              private userService:UserService,
              private cookieService:CookieService,
              public router: Router) {

  }
  ngOnInit():any {
    var email = '', password = '';
    if(this.cookieService.get('email'))
      email = this.cookieService.get('email');
    if(this.cookieService.get('password'))
      password = this.cookieService.get('password');

    this.loginForm = this.formBuilder.group({
      email: [email, [Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      password: [password, Validators.required]
    });
    if(this.cookieService.get('email') && this.cookieService.get('password')){
      this.login();
    }
    /*this.loginForm.valueChanges
     .subscribe((data: any) => {
     console.log("valueChanges")
     console.info(data)
     console.info(this.loginForm)
     }
     );*/
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(response => {
        /**
         * @param response              Information about the object.
         * @param response.isLoggedIn   Information about the object's members.
         */
        if(response.isLoggedIn){
          this.cookieService.put('email',this.loginForm.value.email);
          this.cookieService.put('password',this.loginForm.value.password);
          this.authService.isLoggedIn = true;
          localStorage.setItem('loggedUser', JSON.stringify(this.loginForm.value));
          localStorage.setItem('loggedUserName', response.userName);
          this.router.navigate(['/dashboard']);
        }
        else{
          this.addAlert();
          this.router.navigate(['/login']);
        }
      });
    //this.userService._isLoggedIn = false;
    //this.router.navigateByUrl('/projects');
  }

  logout() {
    //this.authService.logout();
  }

  goToResetPassword(){
    this.router.navigate(['/reset-password']);
  }
  goToSignup(){
    this.router.navigate(['/signup']);
  }

  public alerts:Array<Object> = [

  ];

  public closeAlert(i:number):void {
    this.alerts.splice(i, 1);
  }

  public addAlert():void {
    if(this.alerts.length == 0)
      this.alerts.push({
        msg: 'Authentication failed!',
        type: 'warning',
        closable: true,
        msgIcon: 'fa fa-warning',
        dismissOnTimeout: 3000
      });
  }


}
