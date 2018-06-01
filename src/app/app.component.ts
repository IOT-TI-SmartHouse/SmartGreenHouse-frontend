import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, Router, Routes} from '@angular/router';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, public loginService: LoginService) {

  }

  logout() {
    this.loginService.logout();
  }
}
