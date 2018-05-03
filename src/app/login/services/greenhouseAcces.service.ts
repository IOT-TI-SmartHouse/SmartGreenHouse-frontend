import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GreenhouseAccesService {

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
