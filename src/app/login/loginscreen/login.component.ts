import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { LoginService } from '../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public username: string;
    public password: string;

    public loading = false;

    constructor(private loginService: LoginService) {

    }

    public login(): void {
        // only attempt loggin if no loggin attempt is currently going on
        if (!this.loading) {
            this.loading = true;
            this.loginService.login(this.username, this.password).subscribe(res => {
                this.loading = false;
                swal('Success!', 'Successfully logged in!', 'success');
                this.loginService.setSession(res);
            }, error => {
                this.loading = false;
                swal('Login failed', 'The login attempt has failed', 'error');
            });
        }
    }
}
