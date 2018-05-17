import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/services/login.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { UserRegisterModalComponent} from './user-register-modal/user-register-modal.component';


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
  public isAdmin: boolean;
// , public activeModal: NgbActiveModal, private modalService: NgbModal
  constructor(private loginService: LoginService, private http: HttpClient, private UserModal: UserRegisterModalComponent) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [[10, 25, 50, 100, -1], [ 10, 25, 50, 100, 'All']],
      dom: 'Bfrtip',
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

  public openModal() {
    console.log("opening modal...");
    this.UserModal.openBackDropCustomClass("hello");
  }


  public addUser(): void {
    this.loginService.register(this.username, this.password, this.isAdmin);
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
