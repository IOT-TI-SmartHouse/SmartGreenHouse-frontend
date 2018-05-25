import { Component, OnInit } from '@angular/core';
import {GreenhouseService} from '../../login/services/greenhouse.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import swal from "sweetalert2";
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

  constructor( private greenhouseService: GreenhouseService, private http: HttpClient) { }

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



}
