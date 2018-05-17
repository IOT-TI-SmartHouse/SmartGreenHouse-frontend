import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginService {

    /**
     * Constructor
     */
    constructor(private http: HttpClient, private router: Router) {
        //
    }

    public login(username: string, password: string) {
        return this.http.post(`${environment.apiEndpoint}/user/login`, {
            username: username,
            password: password
        });
    }

    public register(username: string, password: string, isAdmin: boolean) {
        return this.http.post(`${environment.apiEndpoint}/user/register`, {
            username: username,
            password: password,
            isAdmin: isAdmin
        }, {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'x-access-token': localStorage.getItem('id_token')
          })
        }).subscribe(res => {
            // console.log("jwt token of new user: " + res.token);
            swal('Success!', 'Successfully registered!', 'success');
        }, error => {
            swal('Register failed', 'The register attempt has failed', 'error');
        });
    }


    public setSession(authResult) {
        const decoded = jwt_decode(authResult.token);

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('expires_at', decoded.exp);

        this.router.navigate(['/home']);
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        swal('Success!', 'Successfully logged out!', 'success');
    }

    /**
     * check if current login session is still valid
     */
    public isLoggedIn(): boolean {
        return (Date.now() / 1000) < this.getExpiration();
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return expiresAt;
    }
}
