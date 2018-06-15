import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/user/getAll`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    });
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/user/me`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    });
  }

  // returns wheter current user is a admin
  public isAdmin(): boolean {
    return localStorage.getItem('is_admin') === 'true';
  }
}
