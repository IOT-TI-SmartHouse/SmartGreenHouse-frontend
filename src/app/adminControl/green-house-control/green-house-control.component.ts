import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { GreenhouseService } from '../../services/greenhouse.service';
import {Router} from '@angular/router';
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
      // dom: 'Bfrtip',
      // buttons: [
      //   'pageLength',
      //   'colvis',
      //   'copy',
      //   'print',
      //   'excel'//,
      //   // {
      //   //   text: 'Add user',
      //   //   key: '1',
      //   //   action: function (e, dt, node, config) {
      //   //     alert('Angular is amazing! this button even works while it produces a compile error :)');
      //   //   }
      //   // }
      // ]
    };
    this.greenhouseService.getGreenhouses().subscribe( res => {
      console.log(res);
      this.greenhouses = res.greenhouses;
      this.dtTrigger.next();
    });
  }

  public addGreenHouse(): void {
    this.greenhouseService.register(this.name, this.location);
  }

  navigateGreenhouse(greenhouse: any) {
    this.greenhouseService.setSelectedGreenhouse(greenhouse);
    this.router.navigate(['/admin/greenHouseDepartmentControl']);
  }
}
