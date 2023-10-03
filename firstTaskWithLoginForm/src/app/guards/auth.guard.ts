import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginServices = inject(LoginService);
  if (loginServices.isLogged()) {
    return true
  } else {
    router.navigate(['login'])
    return false
  }

}
