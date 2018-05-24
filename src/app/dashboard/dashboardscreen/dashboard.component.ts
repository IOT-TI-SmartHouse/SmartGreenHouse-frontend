import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
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

  public showcaseId: number;

  constructor(private http: HttpClient) {  }

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

  ngOnInit() {
    this.loadGreenhouses();
  }
}
