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
      // filter the greenhouses list to only contain greenhouses that the user does not already have access to
      this.greenhouses = this.filterList(this.greenhouses, this.greenhousesForUser);
    });
    console.log(this.greenhousesForUser);
  }

  public selectGreenhouse(greenhouse) {
    this.selectedGreenhouse = greenhouse;
  }

  /**
   * funtion that filters a list with all elements from a second list
   * @param fullList list to filter
   * @param secondList list that contains the elements to filter out
   */
  filterList(fullList: any[], secondList: any[]): any[] {
    let found;
    return fullList.filter( firstElement => {
      found = false;
      secondList.forEach( secondElement => {
        if (firstElement._id === secondElement._id) {
            found = true;
        }
      });
      if ( found === false) { return true; } else if (found === true) { return false; } else { return 'benis'; }
    });
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
