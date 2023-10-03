import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'order',
    canActivate: [authGuard],
    loadChildren: () => import('./order/order.module').then((m) => m.OrderModule)
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
