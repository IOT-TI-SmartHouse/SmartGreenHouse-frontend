import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {LoginService} from '../../login/services/login.service';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {

  public username: string;
  public password: string;
  public isAdmin: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() { }

  public addUser(): void {
    this.loginService.register(this.username, this.password, this.isAdmin);
  }
}
