import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class GreenhouseDepartmentService {

  constructor(private http: HttpClient) { }

  // create new greenhousedepartment
  public register(name: string, greenhouse: string) {
    return this.http.post(`${environment.apiEndpoint}/greenhousedepartment/register`, {
      name: name,
      greenhouse: greenhouse
    }, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    });
  }

  // delete greenhousedepartment
  public delete(id: string ) {
    return this.http.post(`${environment.apiEndpoint}/greenhousedepartment/delete`, {
      id: id
    }, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    });
  }

  public getGreenhouseDepartments(greenhouseid: string): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/greenhousedepartment/getAll`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token'),
        'greenhouse': greenhouseid
      })
    });
  }

  public setSelectedDepartment(department: any) {
    localStorage.setItem('department', JSON.stringify(department));
  }

  public getSelectedDepartment() {
    return JSON.parse(localStorage.getItem('department'));
  }
}
