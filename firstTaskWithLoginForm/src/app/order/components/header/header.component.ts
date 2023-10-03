import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router, private authServices : LoginService) {
  }
  logout(){
    this.authServices.logout();
    this.router.navigate(['login'])
  }
}
