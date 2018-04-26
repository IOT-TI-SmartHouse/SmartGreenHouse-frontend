import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public username: string;
    public password: string;

    constructor(private loginService: LoginService) {

    }

    public login(): void {
        console.log('login');
        console.log(`${this.username} : ${this.password}`);

        this.loginService.login(this.username, this.password);

        // if(login succesfull){
            // switch
        // }
    }
}
