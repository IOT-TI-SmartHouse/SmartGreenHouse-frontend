import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class LoginService {

    private ip = 'http://192.168.1.170:3000';

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
        }).subscribe(res => this.setSession) ;
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

    loggedIn() {
        // return tokenNotExpired();
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
