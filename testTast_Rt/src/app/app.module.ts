import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { MainTableComponent } from './components/main-table/main-table.component';
import { FormComponent } from './components/form/form.component';
import { CommonModule } from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {CommunicateService} from "./services/communicate.service";
import {SharedFormService} from "./services/shared-form.service";
import {PeopleService} from "./services/people.service";

@NgModule({
  declarations: [
    AppComponent,
    MainTableComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PeopleService, CommunicateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
