import {Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/services/login.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import swal from "sweetalert2";
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
  constructor(private loginService: LoginService, private http: HttpClient) { }

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
    this.getUsers().subscribe( res => {
      console.log(res);
      this.users = res.users;
      this.dtTrigger.next();
    });
  }


  public addUser(): void {
    if(this.password === this.passwordconfirm){
      this.loginService.register(this.username, this.password, this.isAdmin).subscribe(res => {
        // console.log("jwt token of new user: " + res.token);
        swal('Success!', 'Successfully registered new user!', 'success');
        document.getElementById('usermodal').click();
      }, error => {
        swal('Register failed', 'The register attempt has failed', 'error');
      });;
    }
    swal('Failed', 'The passwords dont match', 'error');
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/user/getAll`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': localStorage.getItem('id_token')
      })
    });
  }
}
