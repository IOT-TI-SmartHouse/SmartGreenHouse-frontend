import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  public selectedTab: SelectedTab = SelectedTab.USER;

  constructor(private router: Router) { }

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

}
enum SelectedTab {
  USER = 0,
  GREENHOUSE = 1,
  GREENHOUSEACCESS = 2,
  DEPARTMENT = 3
}
