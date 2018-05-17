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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateUser() {
    this.userControl = true;
    this.greenhouseControl = false;
    // this.router.navigate(['/userControl']);
  }

  navigateGreenhouse() {
    this.greenhouseControl = true;
    this.userControl = false;
    // this.router.navigate(['/greenHouseControl']);
  }

}
