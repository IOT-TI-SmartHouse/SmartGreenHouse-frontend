import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GreenhouseDepartmentService } from '../../services/greenhouse-department.service';
import { GreenhouseService } from '../../services/greenhouse.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  greenhouses: any[];
  departments;

  public showcaseId: number;

  constructor(private http: HttpClient, private router: Router,
       private departmentService: GreenhouseDepartmentService, private greenhouseService: GreenhouseService) {  }

  ngOnInit() {
    this.loadGreenhouses();
  }

  public loadGreenhouses() {
    this.greenhouseService.getGreenhouses().subscribe(res => {
      this.greenhouses = res.greenhouses;
      this.loadDepartments();
    });
  }

  public selectGreenhouse(id) {
    if ( this.showcaseId !== id ) {
      this.showcaseId = id;
    } else {
      this.showcaseId = 0;
    }
  }

  public loadDepartments() {
    this.greenhouses.forEach( greenhouse => {
      this.departmentService.getGreenhouseDepartments(greenhouse._id).subscribe(res => {
        greenhouse.departments = res.departments;
      });
    });
  }

  public navigate(department: any) {
    this.departmentService.setSelectedDepartment(department);
    this.router.navigate(['/dashboard/graphs']);
  }
}
