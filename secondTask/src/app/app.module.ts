import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FilterBatyaPipe } from './services/filter-batya.pipe';
import { FilterHardBatyaPipe } from './services/filter-hard-batya.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterBatyaPipe,
    FilterHardBatyaPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
