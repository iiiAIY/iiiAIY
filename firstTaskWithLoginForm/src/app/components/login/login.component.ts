import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  myReactiveForm! : FormGroup;

  constructor(private authService : LoginService, private router: Router) {
  }

  submitForm () {
    this.authService.login(this.myReactiveForm.value).subscribe({
      next: () => this.router.navigate(['order']),
      error: (err) => alert(err.message)
    })
  }

  ngOnInit() {
    this.myReactiveForm = new FormGroup({
      'email': new FormControl('',[Validators.required, Validators.email]),
      'password': new FormControl('',[Validators.required, Validators.pattern("(?=.*\\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\\$%&\\?].*).{8,}")])
    })
    if (this.authService.isLogged()) {
      this.router.navigate(['order'])
    }
  }

  ngOnDestroy() {
  }
}
