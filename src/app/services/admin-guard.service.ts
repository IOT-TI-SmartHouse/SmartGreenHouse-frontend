import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from './login.service';
import { UserService } from './user.service';

@Injectable()
export class AdminGuard implements CanActivateChild {

  constructor(private router: Router, private loginService: LoginService, private userService: UserService) { }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // check if current user is admin
    const isAdmin: boolean = this.userService.isAdmin();

    // check the roles that are allowed in the current route
    const routeRoles: string[] = route.data['roles'];

    // check admin roles
    return (routeRoles.some(x => x === 'ADMIN') && isAdmin);
  }
}
