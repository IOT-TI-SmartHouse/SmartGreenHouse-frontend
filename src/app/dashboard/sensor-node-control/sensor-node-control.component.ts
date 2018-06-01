import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { SensorNodeService} from '../../services/sensor-node.service';
import { GreenhouseDepartmentService} from '../../services/greenhouse-department.service';
import { GreenhouseService} from '../../services/greenhouse.service';

@Component({
  selector: 'app-sensor-node',
  templateUrl: './sensor-node-control.component.html',
  styleUrls: ['./sensor-node-control.component.css']
})
export class SensorNodeComponent implements OnInit {
  table = $('#sensornodesTable').DataTable();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  greenhouses: any = [];
  departments: any = [];
  sensornodes: any = [];
  public greenhousePlaceholder = 'select a greenhouse';
  public departmentsPlaceholder = 'select a department';
  public selectedDepartment: any;
  public selectedGreenhouse: any;
  public name: string;
  public latitude: string;
  public longitude: string;
  public hardwareserial: string;

  constructor(private sensornodeService: SensorNodeService,
     private departmentService: GreenhouseDepartmentService, private greenhouseService: GreenhouseService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      lengthChange: false
      // lengthMenu: [[10, 25, 50, 100, -1], [ 10, 25, 50, 100, 'All']]
    };

    this.greenhouseService.getGreenhouses().subscribe( res => {
      this.greenhouses = res.greenhouses;
      console.log(res);
    });
  }

  public selectGreenhouse(greenhouse) {
    this.selectedGreenhouse = greenhouse;
    this.departmentService.getGreenhouseDepartments(this.selectedGreenhouse._id).subscribe( res => {
      this.departments = res.departments;
      console.log(res);
      $('#departmentsTable').DataTable().destroy();
      $('#sensornodesTable').DataTable().destroy();
      this.dtTrigger.next();
    });
  }

  public selectDepartment(department) {
    this.selectedDepartment = department;
    this.sensornodeService.getSensorNodes(this.selectedDepartment._id).subscribe( res => {
      this.sensornodes = res.nodes;
      console.log(res);
      $('#departmentsTable').DataTable().destroy();
      $('#sensornodesTable').DataTable().destroy();
      this.dtTrigger.next();
    });
  }

  public addSensorNode(): void {
    this.sensornodeService.register(this.name,
       this.departmentService.getSelectedDepartment(), this.latitude, this.longitude, this.hardwareserial);
  }
}
