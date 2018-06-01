import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { GreenhouseDepartmentService } from '../../services/greenhouse-department.service';
import {SensorNodeService} from '../../services/sensor-node.service';

@Component({
  selector: 'app-graphs-component',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})

export class GraphsComponent implements OnInit {
  fromDate: string;
  toDate: string;
  department: string;
  nodes;
  data;
  chart;

  selectedNode = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private sensorNodeService: SensorNodeService,
      private departmentService: GreenhouseDepartmentService) {  }

  selectNode(id: any) {
    this.selectedNode = id;
    this.loadData(id);
  }

  loadData(id) {
    this.clearGraph();

    this.sensorNodeService.getData(id).subscribe(res => {
      this.data = res.data;

      for (let i = 0; i < this.data.length; i ++) {
        if (this.data[i].sensorType === 'Temperature') {
          this.drawTemperature(this.cleanTimestamp(this.data[i].createdAt), this.data[i].value);
        }
        if (this.data[i].sensorType === 'Humidity') {
          this.drawHumidity(this.cleanTimestamp(this.data[i].createdAt), this.data[i].value);
        }
      }
    });
  }

  cleanTimestamp(timestamp) {
    const date = timestamp.split('T');
    date[1] = date[1].replace('Z', '');
    return date[0] + ' ' + date[1];
  }

  loadNodes(id) {
    this.selectedNode = 0;
    console.log(id);
    this.sensorNodeService.getSensorNodes(id).subscribe(res => {
      this.nodes = res.nodes;

      for (let i = 0; i < this.nodes.length; i ++) {
        this.loadData(this.nodes[i]._id);
      }
    });
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
    this.department = this.departmentService.getSelectedDepartment();
    const url = new URL(window.location.href);

    this.drawGraph();
    this.loadNodes(this.department);
  }
}
