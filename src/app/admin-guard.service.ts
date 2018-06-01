import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';

@Injectable()
export class AdminGuard implements CanActivateChild {

  constructor(private router: Router, private loginService: LoginService, private userService: UserService) {}

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // check if current user is admin
    const isAdmin: boolean = this.userService.isAdmin();

    // check the roles that are allowed in the current route
    const routeRoles: string[] = route.data['roles'];

    // check admin roles
    if (routeRoles.some(x => x === 'ADMIN') && isAdmin) {
        return true;
    }

    return false;

}
}
