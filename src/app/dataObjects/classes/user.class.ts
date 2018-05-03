import { IUser } from '../interfaces/user.interface';

export class User implements IUser {

    public username: string;
    public password: string;
    public isAdmin: boolean;

    constructor() {
    }

}
