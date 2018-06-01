import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { UserService } from '../../login/services/user.service';

@Component({
  selector: 'app-menubar-component',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenuBarComponent {
    title = 'Smart Greenhouse Application';

    constructor(private router: Router, private loginService: LoginService, public userService: UserService) { }

    logout() {
        this.loginService.logout();
    }

    navigate(input: string) {
      this.router.navigate([`/admin/${input}`]);
    }
}
