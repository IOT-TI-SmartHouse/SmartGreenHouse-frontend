import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class LoginService {

    private ip = 'http://localhost:3000';

    /**
     * Constructor
     */
    constructor(private http: HttpClient) {
        //
    }

    public login(username: string, password: string) {
        return this.http.post(`${this.ip}/user/login`, {
            username: username,
            password: password
        }).subscribe(res => {
            this.setSession(res) ;
        });
    }

    public register(username: string, password: string, isAdmin: boolean) {
        return this.http.post('${this.ip}/user/register', {
            username: username,
            password: password,
            isAdmin: isAdmin
        }).subscribe(res => this.setSession) ;
    }

    public getUser(username: string, password: string): Observable<any> {
        return this.http.post('${this.ip}/user/register', {
            username: username,
            password: password
        });
    }

    private setSession(authResult) {
        const decoded = jwt_decode(authResult.token);
        console.log(decoded);
        const expiresAt = moment().add(decoded.exp, 'second');

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('expires_at', decoded.exp);
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
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
