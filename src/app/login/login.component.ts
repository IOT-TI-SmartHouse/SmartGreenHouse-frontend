import { Component } from '@angular/core';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public username: string;
    public password: string;

    public login(): void {
        console.log('login');
        console.log(`${this.username} : ${this.password}`);

        //if(login succesfull){
            //switch 
        //}
    }
}
