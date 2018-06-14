import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SensorNodeService } from '../../services/sensor-node.service';
import { GreenhouseDepartmentService } from '../../services/greenhouse-department.service';
import { GreenhouseService } from '../../services/greenhouse.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sensor-node',
  templateUrl: './sensor-node-control.component.html',
  styleUrls: ['./sensor-node-control.component.css']
})
export class SensorNodeComponent implements OnInit {

  public onCreate: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public isNew = false;
  @Input('node')
  set node(node: any) {
    if (node != null) {
      this.id = node._id;
      this.name = node.name;
      this.latitude = node.latitude;
      this.longitude = node.longitude;
      this.hardwareSerial = node.hardwareSerial;
    }
  }

  greenhouses: any = [];
  departments: any = [];
  public id: string;
  public name: string;
  public latitude: string;
  public longitude: string;
  public hardwareSerial: string;

  constructor(private sensornodeService: SensorNodeService,
              private departmentService: GreenhouseDepartmentService, private greenhouseService: GreenhouseService) { }

  ngOnInit() {
    this.greenhouseService.getGreenhouses().subscribe( res => {
      this.greenhouses = res.greenhouses;
    });
  }

  public addSensorNode() {
    this.sensornodeService.register(this.name,
      this.departmentService.getSelectedDepartment(), this.latitude, this.longitude, this.hardwareSerial);
    this.onCreate.emit(true);
    this.clearInputFields();
  }

  public editSensorNode() {
    this.sensornodeService.update(this.id, this.name,
      this.departmentService.getSelectedDepartment(), this.latitude, this.longitude, this.hardwareSerial).subscribe(res => {
      swal('Success!', 'Successfully updated sensornode!', 'success');
    }, error => {
      swal('Update failed', 'The update attempt has failed:', 'error');
    });
    this.onCreate.emit(true);
  }

  public clearInputFields() {
    this.name = '';
    this.latitude = '';
    this.longitude = '';
    this.hardwareSerial = '';
  }
}
