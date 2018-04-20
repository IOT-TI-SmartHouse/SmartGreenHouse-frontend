import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LoginService {

    /**
     * Constructor
     */
    constructor(private http: HttpClient) {
        //
    }

    public login(username: string, password: string): Observable<any> {
        //return this.http.get('/api/user');
        return this.http.post('http://192.168.1.170:3000/user/login', {
            username: username,
            password: password,
            isAdmin: false
        });
    }
}
