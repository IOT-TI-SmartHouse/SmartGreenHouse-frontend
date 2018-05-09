import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {environment} from '../../../environments/environment';


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
      // console.log("id of new greenhouse: " + res.greenhouse);
      swal('Success!', 'Successfully registered!', 'success');
    }, error => {
      swal('Register failed', 'The register attempt has failed', 'error');
    });
  }

    // update greenhouse
    update() {
        //
    }

    // adminControl only
    // get all greenhouses
    getAll() {
        //
    }
}
