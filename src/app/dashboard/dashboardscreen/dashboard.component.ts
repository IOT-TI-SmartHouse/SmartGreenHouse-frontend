import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {loadConfigurationFromPath} from 'tslint/lib/configuration';
import { Greenhouse } from '../../dataObjects/classes/greenhouses.class';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  greenhouses: Greenhouse[];
  departments;

  public showcaseId: number;

  constructor(private http: HttpClient) {  }

  ngOnInit() {
    this.loadGreenhouses();
  }

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
      this.loadDepartments();
    });
  }

  selectGreenhouse(id) {
    if ( this.showcaseId !== id ) {
      this.showcaseId = id;
    } else {
      this.showcaseId = 0;
    }
  }

  loadDepartments() {
    this.greenhouses.forEach( greenhouse => {
      this.getDepartments(this.getToken(), greenhouse._id).subscribe(res => {
        greenhouse.departments = res.departments;
      });
    });
  }
}
