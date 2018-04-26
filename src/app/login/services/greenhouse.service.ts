import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GreenhouseService {

    private ip = 'http://192.168.1.170:3000';

    /**
     * Constructor
     */
    constructor(private http: HttpClient) {
        //
    }

    // create new greenhouse
    register() {
        //
    }

    // get greenhouse
    get(greenhouseId: number) {
        //
    }

    // update greenhouse
    update() {
        //
    }

    // admin only
    // get all greenhouses
    getAll() {
        //
    }

    // add user to greenhouse
    addUser(greenhouse: number, user: number) {
        //
    }

    // admin only
    // add department
    addDepartment() {
        //
    }
}
