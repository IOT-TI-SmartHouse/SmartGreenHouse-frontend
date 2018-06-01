import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import { environment } from '../../environments/environment';


@Injectable()
export class GreenhouseAccesService {

    /**
     * Constructor
     */
    constructor(private http: HttpClient) {
        //
    }


  // create new greenhouseaccess
  public register(user: string, greenhouse: string) {
    return this.http.post(`${environment.apiEndpoint}/greenhouseaccess/register`, {
      user: user,
      greenhouse: greenhouse
    }, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    }).subscribe(res => {
      swal('Success!', 'Successfully registered new access!', 'success');
    }, error => {
      swal('Register failed', 'The register attempt has failed', 'error');
    });
  }

}
