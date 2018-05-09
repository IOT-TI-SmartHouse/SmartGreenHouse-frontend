import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, Router, Routes} from '@angular/router';
import { LoginService } from '../../login/services/login.service';

@Component({
  selector: 'app-menubar-component',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenuBarComponent {

    constructor(private router: Router, private loginService: LoginService) {

    }

    logout() {
        this.loginService.logout();
      }
}
