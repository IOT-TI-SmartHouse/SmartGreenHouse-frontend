import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private userControl = false;
  private greenhouseControl = false;
  private greenhouseAccessControl = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userControl = true;
  }

  navigateUser() {
    this.userControl = true;
    this.greenhouseControl = false;
    this.greenhouseAccessControl = false;
  }

  navigateGreenhouse() {
    this.greenhouseControl = true;
    this.userControl = false;
    this.greenhouseAccessControl = false;
  }

  navigateGreenhouseAccess() {
    this.greenhouseControl = false;
    this.userControl = false;
    this.greenhouseAccessControl = true;
  }

}
