import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public userControl = false;
  public greenhouseControl = false;
  public greenhouseAccessControl = false;
  public greenhouseDepartmentControl = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userControl = true;
  }

  navigateUser() {
    this.userControl = true;
    this.greenhouseControl = false;
    this.greenhouseAccessControl = false;
    this.greenhouseDepartmentControl = false;
    // this.router.navigate(['/userControl']);
  }

  navigateGreenhouse() {
    this.greenhouseControl = true;
    this.userControl = false;
    this.greenhouseAccessControl = false;
    this.greenhouseDepartmentControl = false;
    // this.router.navigate(['/greenHouseControl']);
  }

  navigateGreenhouseAccess() {
    this.greenhouseControl = false;
    this.userControl = false;
    this.greenhouseAccessControl = true;
    this.greenhouseDepartmentControl = false;
    // this.router.navigate(['/greenHouseControl']);
  }

  navigateGreenhouseDepartment() {
    this.greenhouseControl = false;
    this.userControl = false;
    this.greenhouseAccessControl = false;
    this.greenhouseDepartmentControl = true;
  }
}
