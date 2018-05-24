import { Component, OnInit, ViewChild } from '@angular/core';
import { GreenhouseAccesService} from '../../login/services/greenhouseAcces.service';
import { Subject} from 'rxjs/Subject';
import { GreenhouseService} from '../../login/services/greenhouse.service';
import { UserService} from '../../login/services/user.service';
import { Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, filter, map, merge} from 'rxjs/operators';
import { NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-green-house-acces-control',
  templateUrl: './green-house-acces-control.component.html',
  styleUrls: ['./green-house-acces-control.component.css']
})
export class GreenHouseAccesControlComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  users: any[];
  greenhouses: any = [];
  Access: any = [];
  dtTrigger: Subject<any> = new Subject();


  public userPlaceholder = 'select a user';
  public greenhousePlaceholder = 'select a greenhouse';
  public selectedUser: any;
  public selectedGreenhouse: any;

  greenhousesForUser: any[];


  constructor(private greenhouseAccessService: GreenhouseAccesService, private greenhouseService: GreenhouseService, private userService: UserService) { }

  ngOnInit() {

    this.greenhouseService.getGreenhouses().subscribe( res => {
      this.greenhouses = res.greenhouses;
    });

    this.userService.getUsers().subscribe( res => {
      this.users = res.users;
    });
  }

  public selectUser(user) {
    this.selectedUser = user;
    console.log("getAll");
    this.greenhouseService.getAll(user._id).subscribe( res => {
      console.log(res);
      this.greenhousesForUser = (res as any).users;
    });
    console.log(this.greenhousesForUser);
  }

  public selectGreenhouse(greenhouse) {
    this.selectedGreenhouse = greenhouse;
  }



  // @ViewChild('instance') instance: NgbTypeahead;
  // focus$ = new Subject<string>();
  // click$ = new Subject<string>();
  //
  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     merge(this.focus$),
  //     merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
  //     map(term => (term === '' ? this.users
  //       : this.users.filter(v => v.username.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
  //   );

  public addGreenHouseAccess(): void {
    this.greenhouseAccessService.register(this.selectedUser._id, this.selectedGreenhouse._id);
  }
}
