import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { GreenhouseService } from '../../services/greenhouse.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-green-house-control',
  templateUrl: './green-house-control.component.html',
  styleUrls: ['./green-house-control.component.css']
})
export class GreenHouseControlComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  greenhouses: any = [];
  dtTrigger: Subject<any> = new Subject();

  public name: string;
  public location: string;

  constructor( private greenhouseService: GreenhouseService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [[10, 25, 50, 100, -1], [ 10, 25, 50, 100, 'All']],
    };
    this.greenhouseService.getGreenhouses().subscribe( res => {
      console.log(res);
      this.greenhouses = res.greenhouses;
      this.dtTrigger.next();
    });
  }

  public clearInputFields() {
    this.name = '';
    this.location = '';
  }

  public addGreenHouse(): void {
    this.greenhouseService.register(this.name, this.location).subscribe(res => {
      swal('Success!', 'Successfully registered!', 'success');
      this.refresh();
    }, error => {
      swal('Register failed', 'The register attempt has failed', 'error');
    });
    this.clearInputFields();
  }

  refresh(): void {
    this.greenhouseService.getGreenhouses().subscribe( res => {
      this.greenhouses = res.greenhouses;
      $('#greenhouseTable').DataTable().destroy();
      this.dtTrigger.next();
    });
  }

  public navigateGreenhouse(greenhouse: any) {
    this.greenhouseService.setSelectedGreenhouse(greenhouse);
    this.router.navigate(['/admin/greenHouseDepartmentControl']);
  }
}
