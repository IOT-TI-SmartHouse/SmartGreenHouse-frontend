import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GreenhouseAccessService {

  /**
   * Constructor
   */
  constructor(private http: HttpClient) { }

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
    });
  }

  // delete greenhouseaccess
  public delete(user: string, greenhouse: string) {
    return this.http.post(`${environment.apiEndpoint}/greenhouseaccess/delete`, {
      user: user,
      greenhouse: greenhouse
    }, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    });
  }

}
