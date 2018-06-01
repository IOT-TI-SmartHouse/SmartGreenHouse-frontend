import { IGreenHouse } from '../interfaces/greenhouses.interface';

export class Greenhouse implements IGreenHouse {
    public _id: string;
    public location: string;
    public name: string;
    public departments: any[];

    constructor() {
    }

}
