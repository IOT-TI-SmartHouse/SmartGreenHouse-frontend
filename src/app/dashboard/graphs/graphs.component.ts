import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {IMyDateRangeModel, IMyDrpOptions} from 'mydaterangepicker';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { GreenhouseDepartmentService } from '../../services/greenhouse-department.service';
import { SensorNodeService } from '../../services/sensor-node.service';

@Component({
  selector: 'app-graphs-component',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})

export class GraphsComponent implements OnInit {
  fromDate = '';
  toDate = '';
  preDate: string;
  nexDate: string;
  greenhouse: string;
  department: string;
  nodes;
  data = [];
  tempChart;
  humiChart;
  public selectedNode: any;
  public dateModel: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private sensorNodeService: SensorNodeService,
    private departmentService: GreenhouseDepartmentService) {  }

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
    });
  }

  // DRAW SINGLE NODE DATA
  drawNode(id) {
    this.selectedNode = id;
    for (let i = 0; i < this.data.length; i ++) {
      const dataCheck = this.data[i];

      for (let j = 0; j < dataCheck.length; j ++) {
        if (dataCheck[j].node === id) {
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
    const date = timestamp.split('T');
    date[1] = date[1].slice(0, -8);
    return date[0] + ' ' + date[1];
  }

  drawTemperature(timestamp, temperature) {
    if (this.fromDate !== ''  && this.fromDate !== '') {
      if (timestamp < this.toDate && timestamp > this.fromDate) {
        this.tempChart.data.labels.push(timestamp);
        this.tempChart.data.datasets[0].data.push(temperature);
        this.tempChart.update();
      }
    } else {
      if (timestamp < this.preDate && timestamp > this.nexDate) {
        this.tempChart.data.labels.push(timestamp);
        this.tempChart.data.datasets[0].data.push(temperature);
        this.tempChart.update();
      }
    }
  }

  drawHumidity(timestamp, humidity) {
    if (this.fromDate !== ''  && this.fromDate !== '') {
      if (timestamp < this.toDate && timestamp > this.fromDate) {
        this.humiChart.data.labels.push(timestamp);
        this.humiChart.data.datasets[0].data.push(humidity);
        this.humiChart.update();
      }
    } else {
      if (timestamp < this.preDate && timestamp > this.nexDate) {
        this.humiChart.data.labels.push(timestamp);
        this.humiChart.data.datasets[0].data.push(humidity);
        this.humiChart.update();
      }
    }
  }

  setDefaultDates() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    this.preDate = yyyy + '-' + mm + '-' + dd + ' 00:00';
    this.nexDate = yyyy + '-' + mm + '-' + (dd + 1) + ' 00:00';

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
    this.fromDate = event.beginDate.year + '-' + event.beginDate.month + '-' + event.beginDate.day + ' 00:00';
    this.toDate = event.endDate.year + '-' + event.endDate.month + '-' + event.endDate.day + ' 00:00';
  }

  ngOnInit() {
    const url = new URL(window.location.href);
    this.department = this.departmentService.getSelectedDepartment()._id;

    this.setDefaultDates();
    this.drawGraph();
    this.initData(this.department);
  }
}
