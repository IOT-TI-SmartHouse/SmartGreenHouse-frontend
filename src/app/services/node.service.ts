import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class NodeService {

    /**
     * Constructor
     */
    constructor(private http: HttpClient, private router: Router) {
        //
    }

    public getNodes(id: string): Observable<any> {
        return this.http.get(`${environment.apiEndpoint}/sensornode/getAll`, {
            headers: new HttpHeaders({
            'Content-Type': 'application/Json',
            'x-access-token': this.getToken(),
            'greenhousedepartment': id
            })
        });
    }

    public getData(id: string): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/sensordata/getAll`, {
        headers: new HttpHeaders({
        'Content-Type': 'application/Json',
        'x-access-token': this.getToken(),
        'node': id
        })
    });
    }

    getToken() {
        return String(localStorage.getItem('id_token'));
    }
}
