import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menubar-component',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenuBarComponent {
    title = 'Smart Greenhouse Application';

    constructor(private router: Router, private loginService: LoginService, private userService: UserService) { }

    public logout() {
        this.loginService.logout();
    }

    public navigate(input: string) {
      this.router.navigate([`/admin/${input}`]);
    }
}
