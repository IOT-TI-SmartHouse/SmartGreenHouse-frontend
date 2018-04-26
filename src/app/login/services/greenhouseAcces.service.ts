import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GreenhouseAccesService {

    private ip = 'http://192.168.1.170:3000';

    /**
     * Constructor
     */
    constructor(private http: HttpClient) {
        //
    }

    addUser() {
        //
    }

    // admin only
    // get all greenhouseAcces
    getAll() {
        //
    }

    // get all acces for user
    getAllForUser(user: number) {
        //
    }

    update(greenhouse: number, user: number) {

    }

    get(id: number) {
        //
    }

}
