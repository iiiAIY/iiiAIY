import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderTripComponent} from "./components/order-trip/order-trip.component";

const routes: Routes = [
   {path: '', component: OrderTripComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
