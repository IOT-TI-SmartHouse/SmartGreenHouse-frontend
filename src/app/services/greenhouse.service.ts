import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class GreenhouseService {

  /**
   * Constructor
   */
  constructor(private http: HttpClient) { }

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

  // adminControl only
  // get all greenhouses
  public getAll(userId: string) {
    return this.http.get(`${environment.apiEndpoint}/greenhouse/getAll`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token'),
        'userid': userId
      })
    });
  }

  public getAllAccess(greenhouseId: string) {
    return this.http.get(`${environment.apiEndpoint}/greenhouse/getAllAccess`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token'),
        'greenhouseid': greenhouseId
      })
    });
  }

  public setSelectedGreenhouse(greenhouse: any) {
    localStorage.setItem('greenhouse', JSON.stringify(greenhouse));
  }

  public getSelectedGreenhouse() {
    return JSON.parse(localStorage.getItem('greenhouse'));
  }
}
