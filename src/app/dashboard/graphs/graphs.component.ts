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

  loadNodes(id) {
    this.getNodes(this.getToken(), id).subscribe(res => {
      this.nodes = res.nodes;

      for (let i = 0; i < this.nodes.length; i ++) {
        this.loadData(this.nodes[i]._id);
      }
    });
  }

  loadData(id) {
    this.getData(this.getToken(), id).subscribe(res => {
      alert(JSON.stringify(res));
    });
  }

  ngOnInit() {
    const url = new URL(window.location.href);
    this.greenhouse = url.searchParams.get('greenhouse');
    this.department = url.searchParams.get('department');

    this.loadNodes(this.department);
  }
}
