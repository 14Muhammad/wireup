import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import {FormsModule, ReactiveFormsModule}         from '@angular/forms';

import { AwesomePipe }         from './awesome.pipe';
import { HighlightDirective }  from './highlight.directive';
import {EllipsesPipe} from "./pipes/ellipses.pipe";
import {InitCapsPipe} from "./pipes/init-caps.pipe";
import {HttpModule} from "@angular/http";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {DevExtremeModule} from "devextreme-angular2";
import {MaterialRootModule} from "@angular/material";

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ AwesomePipe, HighlightDirective,EllipsesPipe, InitCapsPipe ],
  exports:      [
    /* Custom */
    AwesomePipe,
    EllipsesPipe,
    InitCapsPipe,

    /* Angular Modules */
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    /* 3rd party Modules */
    DevExtremeModule,
    MaterialRootModule,
    Ng2BootstrapModule
  ]
})
export class SharedModule { }

