import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AppModule } from '../../app.module';
import { Chart } from 'chart.js';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {loadConfigurationFromPath} from 'tslint/lib/configuration';

@Component({
  selector: 'app-graphs-component',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})

export class GraphsComponent implements OnInit {
  greenhouse: string;
  department: string;
  nodes;
  data;
  chart;

  selectedNode = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {  }

  public getNodes(token: string, id: string): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/sensornode/getAll`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/Json',
        'x-access-token': token,
        'greenhousedepartment': id
      })
    });
  }

  public getData(token: string, id: string): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/sensordata/getAll`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/Json',
        'x-access-token': token,
        'node': id
      })
    });
  }

  getToken() {
    return String(localStorage.getItem('id_token'));
  }

  selectNode(id: any) {
    this.selectedNode = id;
    this.loadData(id);
  }

  loadData(id) {
    this.clearGraph();

    this.getData(this.getToken(), id).subscribe(res => {
      this.data = res.data;

      for (let i = 0; i < this.data.length; i ++) {
        if (this.data[i].sensorType === 'Temperature') {
          this.drawTemperature(this.data[i].createdAt, this.data[i].value);
        }
        if (this.data[i].sensorType === 'Humidity') {
          this.drawHumidity(this.data[i].createdAt, this.data[i].value);
        }
      }
    });
  }

  loadNodes(id) {
    this.selectedNode = 0;
    this.getNodes(this.getToken(), id).subscribe(res => {
      this.nodes = res.nodes;

      for (let i = 0; i < this.nodes.length; i ++) {
        this.loadData(this.nodes[i]._id);
      }
    });
  }

  drawTemperature(timestamp, temperature) {
    this.chart.data.labels.push(timestamp);
    this.chart.data.datasets[0].data.push(temperature);
    this.chart.update();
  }

  drawHumidity(timestamp, humidity) {
    this.chart.data.labels.push(timestamp);
    this.chart.data.datasets[1].data.push(humidity);
    this.chart.update();
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
    this.greenhouse = url.searchParams.get('greenhouse');
    this.department = url.searchParams.get('department');

    this.drawGraph();
    this.loadNodes(this.department);
  }
}
