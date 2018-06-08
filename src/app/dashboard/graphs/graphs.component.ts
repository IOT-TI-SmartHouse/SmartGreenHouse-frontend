import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {IMyDateRangeModel, IMyDrpOptions} from 'mydaterangepicker';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { GreenhouseDepartmentService } from '../../services/greenhouse-department.service';
import { SensorNodeService } from '../../services/sensor-node.service';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-graphs-component',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})

export class GraphsComponent implements OnInit {
  fromDate = new Date();
  toDate = new Date();
  greenhouse: string;
  department: any;
  nodes;
  data = [];
  tempChart;
  humiChart;
  public selectedNode: any;
  public dateModel: any;

  @ViewChild(MapComponent)
  public map: MapComponent;

  constructor(private route: ActivatedRoute, private http: HttpClient, private sensorNodeService: SensorNodeService,
      private departmentService: GreenhouseDepartmentService, private router: Router) {
  }

  // GET ALL DATA
  initData(id) {
    this.sensorNodeService.getSensorNodes(id).subscribe(res => {
      this.nodes = res.nodes;
      for (let i = 0; i < this.nodes.length; i ++) {
        this.saveData(this.nodes[i]._id);
      }
    });
  }

  // SAVE DATA LOCALLY AND DRAW IT
  saveData(id) {
    this.sensorNodeService.getData(id).subscribe(res => {
      this.data.push(res.data);
      this.drawData(res.data);
      this.map.update(id, res.data);
    });
  }

  // DRAW SINGLE NODE DATA
  drawNode(node) {
    this.selectedNode = node;
    console.log(this.selectedNode);
    for (let i = 0; i < this.data.length; i ++) {
      const dataCheck = this.data[i];

      for (let j = 0; j < dataCheck.length; j ++) {
        if (dataCheck[j].node === node._id) {
          this.drawData(dataCheck);
          break;
        }
      }
    }
  }

  // DRAW ALL NODE DATA
  drawNodes() {
    this.selectedNode = null;
    for (let i = 0; i < this.data.length; i ++) {
      this.drawData(this.data[i]);
    }
  }

  drawData(data) {
    for (let i = 0; i < data.length; i ++) {
      if (data[i].sensorType === 'Temperature') {
        this.drawTemperature(this.cleanTimestamp(data[i].createdAt), data[i].value);
      }
      if (data[i].sensorType === 'Humidity') {
        this.drawHumidity(this.cleanTimestamp(data[i].createdAt), data[i].value);
      }
    }
  }

  cleanTimestamp(timestamp) {
    const timestampArray = timestamp.split('T');
    const dateArray = timestampArray[0].split('-');
    const timeArray = timestampArray[1].split(':');

    const date = new Date();
    date.setFullYear(dateArray[0], (dateArray[1] - 1), dateArray[2]);
    date.setUTCHours(timeArray[0], timeArray[1], 0, 0);

    return date;
  }

  drawTemperature(date, temperature) {
    if (date < this.toDate && date > this.fromDate) {
      this.tempChart.data.labels.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay()
        + ' ' + date.getHours() + ':' + date.getMinutes());
      this.tempChart.data.datasets[0].data.push(temperature);
      this.tempChart.update();
    }
  }

  drawHumidity(date, humidity) {
    if (date < this.toDate && date > this.fromDate) {
      this.humiChart.data.labels.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay()
        + ' ' + date.getHours() + ':' + date.getMinutes());
      this.humiChart.data.datasets[0].data.push(humidity);
      this.humiChart.update();
    }
  }

  setDefaultDates() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth();
    const dd = date.getDate();

    this.fromDate.setFullYear(yyyy, mm, dd);
    this.fromDate.setHours(0, 0, 0, 0 );

    this.toDate.setFullYear(yyyy, mm, dd + 1);
    this.toDate.setHours(0, 0, 0, 0 );


    this.dateModel = {beginDate: {year: yyyy, month: mm, day: dd},
      endDate: {year: yyyy, month: mm, day: (dd + 1)}};
  }

  drawGraph() {
    const temp = document.getElementById('tempChart');
    this.tempChart = new Chart(temp, {
      type: 'line',
      data: {
        datasets: [{ label: 'Temperature' }]
      }
    });

    const humi = document.getElementById('humiChart');
    this.humiChart = new Chart(humi, {
      type: 'line',
      data: {
        datasets: [{ label: 'Humidity' }]
      }
    });
  }

  clearGraph() {
    this.tempChart.data.labels = [];
    this.humiChart.data.labels = [];

    for (let i = 0; i < this.tempChart.data.datasets.length; i ++) {
      this.tempChart.data.datasets[i].data = [];
    }
    for (let i = 0; i < this.humiChart.data.datasets.length; i ++) {
      this.humiChart.data.datasets[i].data = [];
    }

    this.tempChart.update();
    this.humiChart.update();
  }

  setDates(event: IMyDateRangeModel) {
    this.fromDate.setFullYear(event.beginDate.year, event.beginDate.month - 1, event.beginDate.day);
    this.toDate.setFullYear(event.endDate.year, event.endDate.month - 1, event.endDate.day);
  }

  ngOnInit() {
    const url = new URL(window.location.href);
    this.department = this.departmentService.getSelectedDepartment();

    this.setDefaultDates();
    this.drawGraph();
    this.initData(this.department._id);
  }

  refresh(event) {
    this.initData(this.department._id);
  }
}
