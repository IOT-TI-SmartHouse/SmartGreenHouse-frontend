import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
    public _id: string;
    public username: string;
    public isAdmin: boolean;
    public createdAt: Date;

    constructor() {
    }

}
