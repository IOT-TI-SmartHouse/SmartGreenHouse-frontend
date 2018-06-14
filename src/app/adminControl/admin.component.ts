import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  public selectedTab: SelectedTab = SelectedTab.USER;

  constructor() { }

  public navigateUser() {
    this.selectedTab = SelectedTab.USER;
  }

  public navigateGreenhouse() {
    this.selectedTab = SelectedTab.GREENHOUSE;
  }

  public navigateGreenhouseAccess() {
    this.selectedTab = SelectedTab.GREENHOUSEACCESS;
  }

  public navigateGreenhouseDepartment() {
    this.selectedTab = SelectedTab.DEPARTMENT;
  }
}
enum SelectedTab {
  USER = 0,
  GREENHOUSE = 1,
  GREENHOUSEACCESS = 2,
  DEPARTMENT = 3
}
