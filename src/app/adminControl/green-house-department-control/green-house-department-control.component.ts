import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import { GreenhouseService } from '../../services/greenhouse.service';
import { GreenhouseDepartmentService } from '../../services/greenhouse-department.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-green-house-department-control',
  templateUrl: './green-house-department-control.component.html',
  styleUrls: ['./green-house-department-control.component.css']
})
export class GreenHouseDepartmentControlComponent implements OnInit {
  table = $('#departmentsTable').DataTable();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  departments: any = [];
  greenhouses: any = [];
  public greenhousePlaceholder = 'select a greenhouse';
  public selectedGreenhouse: any;
  public selectedGreenhouseId: any;
  public name: string;

  constructor(private greenhouseService: GreenhouseService, private departmentService: GreenhouseDepartmentService, private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      lengthChange: false
      // lengthMenu: [[10, 25, 50, 100, -1], [ 10, 25, 50, 100, 'All']]
    };

    this.selectGreenhouse(this.greenhouseService.getSelectedGreenhouse());

    this.greenhouseService.getGreenhouses().subscribe( res => {
      this.greenhouses = res.greenhouses;
      console.log(res);
    });
  }

  public selectGreenhouse(greenhouse) {
    this.selectedGreenhouse = greenhouse;
    this.departmentService.getGreenhouseDepartments(this.selectedGreenhouse._id).subscribe( res => {
      this.departments = res.departments;
      $('#departmentsTable').DataTable().destroy();
      this.dtTrigger.next();
    });
  }

  public addDepartment(): void {
    this.departmentService.register(this.name, this.selectedGreenhouse._id);
  }

  onOptionsSelected(event: any) {
    this.selectGreenhouse(this.greenhouses.find( greenhouse => greenhouse._id === event ));
  }

  navigateDepartment(department: any) {
    this.departmentService.setSelectedDepartment(department);
    this.router.navigate(['/dashboard/graphs']);
  }
}
