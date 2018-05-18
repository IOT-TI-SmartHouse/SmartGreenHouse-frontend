import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
import { WeatherService } from '../services/weather.services';
import { Chart } from 'chart.js';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {loadConfigurationFromPath} from 'tslint/lib/configuration';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  greenhouses;
  departments;
  nodes;

  public showcaseId: number;

  constructor(private weather: WeatherService, private http: HttpClient) {  }

  public getGreenhouses(token: string): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/greenhouse/getAll`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/Json',
        'x-access-token': token
      })
    });
  }

  public getDepartments(token: string, id: string): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/greenhousedepartment/getAll`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/Json',
        'x-access-token': token,
        'greenhouse': id
      })
    });
  }

  public getNodes(token: string, id: string): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/sensornode/getAll`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/Json',
        'x-access-token': token,
        'greenhousedepartment': id
      })
    });
  }

  getToken() {
    return String(localStorage.getItem('id_token'));
  }

  loadGreenhouses() {
    this.getGreenhouses(this.getToken()).subscribe(res => {
      this.greenhouses = res.greenhouses;
    });
  }

  loadDepartments(id) {
    this.showcaseId = id;
    this.getDepartments(this.getToken(), id).subscribe(res => {
      this.departments = res.departments;
    });
  }

  loadNodes(id) {
    this.showcaseId = id;
    this.getNodes(this.getToken(), id).subscribe(res => {
      this.nodes = res.nodes;
      alert(this.nodes);
    });
  }

  ngOnInit() {
    this.loadGreenhouses();
  }
}
