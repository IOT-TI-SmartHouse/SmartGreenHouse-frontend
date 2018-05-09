import { Component, OnInit } from '@angular/core';
import {GreenhouseAccesService} from '../../login/services/greenhouseAcces.service';

@Component({
  selector: 'app-green-house-acces-control',
  templateUrl: './green-house-acces-control.component.html',
  styleUrls: ['./green-house-acces-control.component.css']
})
export class GreenHouseAccesControlComponent implements OnInit {

  public user: string;
  public greenhouse: string;

  constructor(private greenhouseAccessService: GreenhouseAccesService) { }

  ngOnInit() {
  }

  public addGreenHouseAccess(): void {
    this.greenhouseAccessService.register(this.user, this.greenhouse);
  }
}
