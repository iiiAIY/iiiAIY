import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderTripComponent } from './components/order-trip/order-trip.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [
    OrderTripComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ]
})
export class OrderModule { }
