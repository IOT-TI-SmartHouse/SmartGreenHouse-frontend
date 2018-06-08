import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { SensorNodeService} from '../../services/sensor-node.service';
import { GreenhouseDepartmentService} from '../../services/greenhouse-department.service';
import { GreenhouseService} from '../../services/greenhouse.service';
import {Router} from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-sensor-node',
  templateUrl: './sensor-node-control.component.html',
  styleUrls: ['./sensor-node-control.component.css']
})
export class SensorNodeComponent implements OnInit {
  table = $('#sensornodesTable').DataTable();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @Output()
    public onCreate: EventEmitter<any> = new EventEmitter<any>();

  @Input()
    public isNew = false;
  @Input('node')
    set node(node: any) {
    this.id = node._id;
    this.name = node.name;
    this.latitude = node.latitude;
    this.longitude = node.longitude;
    this.hardwareserial = node.hardwareserial;
  }

  greenhouses: any = [];
  departments: any = [];
  sensornodes: any = [];
  public greenhousePlaceholder = 'select a greenhouse';
  public departmentsPlaceholder = 'select a department';
  public selectedDepartment: any;
  public selectedGreenhouse: any;
  public id: string;
  public name: string;
  public latitude: string;
  public longitude: string;
  public hardwareserial: string;

  constructor(private sensornodeService: SensorNodeService,
     private departmentService: GreenhouseDepartmentService, private greenhouseService: GreenhouseService, private router: Router) { }

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

  public addSensorNode() {
    this.sensornodeService.register(this.name,
       this.departmentService.getSelectedDepartment(), this.latitude, this.longitude, this.hardwareserial);
    this.onCreate.emit(true);
    this.clearInputFields();
  }

  public editSensorNode() {
    this.sensornodeService.update(this.id, this.name,
      this.departmentService.getSelectedDepartment(), this.latitude, this.longitude, this.hardwareserial).subscribe(res => {
      swal('Success!', 'Successfully updated sensornode!', 'success');
      this.clearInputFields();
    }, error => {
      swal('Update failed', 'The update attempt has failed', 'error');
    });
    this.onCreate.emit(true);
  }

  public clearInputFields() {
    this.name = '';
    this.latitude = '';
    this.longitude = '';
    this.hardwareserial = '';
  }
}
