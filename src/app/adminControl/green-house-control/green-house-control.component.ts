import { Component, OnInit } from '@angular/core';
import {GreenhouseService} from '../../login/services/greenhouse.service';

@Component({
  selector: 'app-green-house-control',
  templateUrl: './green-house-control.component.html',
  styleUrls: ['./green-house-control.component.css']
})
export class GreenHouseControlComponent implements OnInit {

  public name: string;
  public location: string;

  constructor(private greenhouseService: GreenhouseService) { }

  ngOnInit() {
  }

  public addGreenHouse(): void {
    this.greenhouseService.register(this.name, this.location);
  }

}
