import {Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';

declare var $: any;


@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  users: any = [];
  dtTrigger: Subject<any> = new Subject();

  public username: string;
  public password: string;
  public passwordconfirm: string;
  public isAdmin: boolean;
  constructor(private loginService: LoginService, private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [[10, 25, 50, 100, -1], [ 10, 25, 50, 100, 'All']],
      // dom: 'Bfrtip',
      // buttons: [
      //   'pageLength',
      //   'colvis',
      //   'copy',
      //   'print',
      //   'excel'//,
      //   // {
      //   //   text: 'Add user',
      //   //   key: '1',
      //   //   action: function (e, dt, node, config) {
      //   //     alert('Angular is amazing! this button even works while it produces a compile error :)');
      //   //   }
      //   // }
      // ]
    };
    this.userService.getUsers().subscribe( res => {
      this.users = res.users;
      this.dtTrigger.next();
    });
  }

  public addUser(): void {
    if (this.password === this.passwordconfirm) {
      this.loginService.register(this.username, this.password, this.isAdmin).subscribe(res => {
        swal('Success!', 'Successfully registered new user!', 'success');
        // refresh users
        this.userService.getUsers().subscribe( response => {
          this.users = response.users;
          $('#userstable')
          .DataTable()
          .destroy();
          this.dtTrigger.next();
        });
        document.getElementById('usermodal').click();
        this.clearInputFields();
      }, error => {
        swal('Register failed', 'The register attempt has failed', 'error');
        this.clearInputFields();
      });
    }
    swal('Failed', 'The passwords dont match', 'error');
  }

  public clearInputFields() {
    this.username = '';
    this.password = '';
    this.passwordconfirm = '';
    this.isAdmin = false;
  }
}
