import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { GreenhouseDepartmentService } from '../../services/greenhouse-department.service';
import { SensorNodeService } from '../../services/sensor-node.service';
import { MapComponent } from '../map/map.component';

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
      private departmentService: GreenhouseDepartmentService) {
  }

  // GET ALL DATA
  public initData(id) {
    this.sensorNodeService.getSensorNodes(id).subscribe(res => {
      this.nodes = res.nodes;
      for (let i = 0; i < this.nodes.length; i ++) {
        this.saveData(this.nodes[i]._id);
        this.map.create(this.nodes[i]._id, this.nodes[i].name, this.nodes[i].latitude, this.nodes[i].longitude);
      }
    });
  }

  // SAVE DATA LOCALLY AND DRAW IT
  public saveData(id) {
    this.sensorNodeService.getData(id).subscribe(res => {
      this.data.push(res.data);
      this.drawData(res.data);

      // check last of temp and hum to update the map
      let tempFound, humFound;
      for (let i = res.data.length - 1; i >= 0 ; i--) {
        if (res.data[i].sensorType === 'Humidity' && !humFound) {
          this.drawMapData(res.data[i]);
          humFound = true;
        }
        if (res.data[i].sensorType === 'Temperature' && !tempFound) {
          this.drawMapData(res.data[i]);
          tempFound = true;
        }
        if (tempFound && humFound) {
          return;
        }
      }
    });
  }

  // DRAW SINGLE NODE DATA
  public drawNode(node) {
    this.selectedNode = node;
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
  public drawNodes() {
    this.selectedNode = null;
    for (let i = 0; i < this.data.length; i ++) {
      this.drawData(this.data[i]);
    }
  }

  public drawMapData(data) {
    if (data.sensorType === 'Humidity') {
      this.map.update(data.node, null, data.value);
    } else if (data.sensorType === 'Temperature') {
      this.map.update(data.node, data.value, null);
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

  public cleanTimestamp(timestamp) {
    const timestampArray = timestamp.split('T');
    const dateArray = timestampArray[0].split('-');
    const timeArray = timestampArray[1].split(':');

    const date = new Date();
    date.setFullYear(dateArray[0], (dateArray[1] - 1), dateArray[2]);
    date.setUTCHours(timeArray[0], timeArray[1], 0, 0);

    return date;
  }

  public drawTemperature(date, temperature) {
    if (date.getTime() < this.toDate.getTime() && date.getTime() > this.fromDate.getTime()) {
      this.tempChart.data.labels.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay()
        + ' ' + date.getHours() + ':' + date.getMinutes());
      this.tempChart.data.datasets[0].data.push(temperature);
      this.tempChart.update();
    }
  }

  public drawHumidity(date, humidity) {
    if (date < this.toDate && date > this.fromDate) {
      this.humiChart.data.labels.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay()
        + ' ' + date.getHours() + ':' + date.getMinutes());
      this.humiChart.data.datasets[0].data.push(humidity);
      this.humiChart.update();
    }
  }

  public setDefaultDates() {
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

  public drawGraph() {
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

  public clearGraph() {
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

  public setDates(event: IMyDateRangeModel) {
    this.fromDate.setFullYear(event.beginDate.year, event.beginDate.month - 1, event.beginDate.day);
    this.toDate.setFullYear(event.endDate.year, event.endDate.month - 1, event.endDate.day);

    // redraw selected nodes
    if (this.selectedNode) {
      this.drawNode(this.selectedNode);
    } else {
      this.drawNodes();
    }
  }

  ngOnInit() {
    this.department = this.departmentService.getSelectedDepartment();
    this.setDefaultDates();
    this.drawGraph();
    this.initData(this.department._id);
  }

  refresh() {
    this.initData(this.department._id);
  }
}
