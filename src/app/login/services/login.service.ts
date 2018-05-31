import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class LoginService {

    /**
     * Constructor
     */
    constructor(private http: HttpClient, private router: Router, private userService: UserService) {
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
        });
    }


    public setSession(authResult) {
        const decoded = jwt_decode(authResult.token);

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('user_id', decoded.id);
        localStorage.setItem('is_admin', authResult.isAdmin);
        localStorage.setItem('expires_at', decoded.exp);

        this.router.navigate(['/home']);
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('expires_at');
        swal({
            title: 'Success!',
            text: 'Successfully logged out!',
            type: 'success',
            position: 'top-end',
            timer: 1000,
            toast: true,
            showConfirmButton: false,
        });
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
