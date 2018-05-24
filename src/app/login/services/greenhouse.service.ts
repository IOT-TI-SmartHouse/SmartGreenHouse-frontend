import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class GreenhouseService {

    /**
     * Constructor
     */
    constructor(private http: HttpClient) {
        //
    }

    // create new greenhouse
  public register(name: string, location: string) {
    return this.http.post(`${environment.apiEndpoint}/greenhouse/register`, {
      name: name,
      location: location
    }, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    }).subscribe(res => {
      swal('Success!', 'Successfully registered!', 'success');
    }, error => {
      swal('Register failed', 'The register attempt has failed', 'error');
    });
  }


  public getGreenhouses(): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/greenhouse/getAll`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    });
  }



    // update greenhouse
    update() {
        //
    }

    // adminControl only
    // get all greenhouses
    getAll(userId: string) {
      return this.http.post(`${environment.apiEndpoint}/greenhouse/getAll`, {
        userid: userId,
      }, {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'x-access-token': localStorage.getItem('id_token')
        })
      });
    }

  getAllAccess(greenhouseId: string) {
    return this.http.post(`${environment.apiEndpoint}/greenhouse/getAllAccess`, {
      greenhouseId: greenhouseId,
    }, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    });
  }
}
