import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import {Observable} from 'rxjs/Observable';


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
    }).subscribe(res => {
      swal('Success!', 'Successfully registered new department!', 'success');
    }, error => {
      swal('Register failed', 'The register attempt has failed', 'error');
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
    }).subscribe(res => {
      swal('Success!', 'Successfully deleted the department!', 'success');
    }, error => {
      swal('Register failed', 'The delete attempt has failed', 'error');
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
}
