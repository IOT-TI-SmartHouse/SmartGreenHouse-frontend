import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
import { WeatherService } from '../services/weather.services';
import { Chart } from 'chart.js';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart = [];

  constructor(private weather: WeatherService, private http: HttpClient) {  }

  public getAll(token: String): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}/sensornode/getAll`, {
      token: token
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  ngOnInit() {
    this.weather.sampleForecast()
    .subscribe(res => {
      const temp_max = res['list'].map(result => result.main.temp_max);
      const temp_min = res['list'].map(result => result.main.temp_min);
      const allDates = res['list'].map(result => result.dt);

      const weatherDates = [];
      allDates.forEach(element => {
        const jsdate = new Date(element * 1000);
        weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp_max,
              borderColor: '#3cba9f',
              fill: false
            },
            {
              data: temp_min,
              borderColor: '#ffcc00',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });

    });

    this.getAll(this.getToken());
  }
}
