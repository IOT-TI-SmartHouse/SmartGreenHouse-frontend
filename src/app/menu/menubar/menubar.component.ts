import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
import { Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, Router, Routes} from '@angular/router';
import { LoginService } from '../../login/services/login.service';

@Component({
  selector: 'app-menubar-component',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenuBarComponent implements OnInit {
  public selectedTab: SelectedTab = SelectedTab.USER;
  title = 'Smart Greenhouse Application';

  constructor(private router: Router, private loginService: LoginService) { }
  logout() {
    this.loginService.logout();
  }

  ngOnInit() {
  }

  navigateUser() {
    this.selectedTab = SelectedTab.USER;
  }

  navigateGreenhouse() {
    this.selectedTab = SelectedTab.GREENHOUSE;
  }

  navigateGreenhouseAccess() {
    this.selectedTab = SelectedTab.GREENHOUSEACCESS;
  }

  navigateGreenhouseDepartment() {
    this.selectedTab = SelectedTab.DEPARTMENT;
  }
}

enum SelectedTab {
  USER = 0,
  GREENHOUSE = 1,
  GREENHOUSEACCESS = 2,
  DEPARTMENT = 3
}
