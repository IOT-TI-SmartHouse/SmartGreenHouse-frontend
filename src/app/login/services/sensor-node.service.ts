import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SensorNodeService {

  constructor(private http: HttpClient) { }

  // create new sensornode
  public register(name: string, greenhouseDepartment: string, latitude: string, longitude: string) {
    return this.http.post(`${environment.apiEndpoint}/sensornode/register`, {
      name: name,
      greenhouseDepartment: greenhouseDepartment,
      latitude: latitude,
      longitude: longitude
    }, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    }).subscribe(res => {
      swal('Success!', 'Successfully registered new sensornode!', 'success');
    }, error => {
      swal('Register failed', 'The register attempt has failed', 'error');
    });
  }


  // update sensornode
  public update(id: string, name: string, greenhouseDepartment: string, latitude: string, longitude: string) {
    return this.http.post(`${environment.apiEndpoint}/sensornode/update`, {
      id: id,
      name: name,
      greenhouseDepartment: greenhouseDepartment,
      latitude: latitude,
      longitude: longitude
    }, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    }).subscribe(res => {
      swal('Success!', 'Successfully updated sensornode!', 'success');
    }, error => {
      swal('Register failed', 'The register attempt has failed', 'error');
    });
  }

  public getSensorNodes(departmentid: string): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/sensornode/getAll`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token'),
        'greenhousedepartment': departmentid
      })
    });
  }

}
