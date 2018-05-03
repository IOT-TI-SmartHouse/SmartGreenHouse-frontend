import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

    /**
     * Constructor
     */
    constructor(private http: HttpClient, private router: Router) {
        //
    }

    public login(username: string, password: string): Observable<Object> {
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
        }).subscribe(res => {
            this.setSession(res);
            swal('Success!', 'Successfully registered!', 'success');
        }, error => {
            swal('Register failed', 'The register attempt has failed', 'error');
        });
    }

    public getUser(username: string, password: string): Observable<any> {
        return this.http.post(`${environment.apiEndpoint}/user/register`, {
            username: username,
            password: password
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
