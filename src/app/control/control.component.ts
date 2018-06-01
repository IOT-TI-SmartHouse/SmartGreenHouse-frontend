import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  public selectedTab: SelectedTab = SelectedTab.SENSORNODE;


  constructor() { }

  ngOnInit() {
  }

  navigateSensorNode() {
    this.selectedTab = SelectedTab.SENSORNODE;
  }

}

enum SelectedTab {
  SENSORNODE = 0
}
