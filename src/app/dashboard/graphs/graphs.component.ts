import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AppModule } from '../../app.module';
import { Chart } from 'chart.js';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {loadConfigurationFromPath} from 'tslint/lib/configuration';
import { GreenhouseDepartmentService } from '../../services/greenhouse-department.service';
import { SensorNodeService } from '../../services/sensor-node.service';

@Component({
  selector: 'app-graphs-component',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})

export class GraphsComponent implements OnInit {
  fromDate: string;
  toDate: string;
  greenhouse: string;
  department: string;
  nodes;
  data = [];
  chart;
  public selectedNode: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private sensorNodeService: SensorNodeService,
      private departmentService: GreenhouseDepartmentService, private router: Router) {  }

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
    date[1] = date[1].replace('Z', '');
    return date[0] + ' ' + date[1];
  }

  drawTemperature(timestamp, temperature) {
    if (this.fromDate == null && this.toDate == null) {
      this.chart.data.labels.push(timestamp);
      this.chart.data.datasets[0].data.push(temperature);
      this.chart.update();
    } else if (timestamp < this.toDate && timestamp > this.fromDate) {
      this.chart.data.labels.push(timestamp);
      this.chart.data.datasets[0].data.push(temperature);
      this.chart.update();
    }
  }

  drawHumidity(timestamp, humidity) {
    if (this.fromDate == null && this.toDate == null) {
      this.chart.data.labels.push(timestamp);
      this.chart.data.datasets[1].data.push(humidity);
      this.chart.update();
    } else if (timestamp < this.toDate && timestamp > this.fromDate) {
      this.chart.data.labels.push(timestamp);
      this.chart.data.datasets[1].data.push(humidity);
      this.chart.update();
    }
  }

  setDates(from, to) {
    this.fromDate = from + ' 00:00:00.000';
    this.toDate = to + ' 00:00:00.000';
  }

  drawGraph() {
    const ctx = document.getElementById('generalChart');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          { label: 'Temperature' },
          { label: 'Humidity' }
          ] }
    });
  }

  clearGraph() {
    this.chart.data.labels = [];

    for (let i = 0; i < this.chart.data.datasets.length; i ++) {
      this.chart.data.datasets[i].data = [];
    }

    this.chart.update();
  }

  ngOnInit() {
    const url = new URL(window.location.href);
    this.department = this.departmentService.getSelectedDepartment()._id;

    this.drawGraph();
    this.initData(this.department);
  }

  refresh(event){
    //this.loadData();
  }
}
