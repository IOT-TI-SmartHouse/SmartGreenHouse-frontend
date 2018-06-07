import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject} from 'rxjs/Subject';
import { GreenhouseAccesService } from '../../services/greenhouseAcces.service';
import { GreenhouseService } from '../../services/greenhouse.service';
import { UserService } from '../../services/user.service';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-green-house-acces-control',
  templateUrl: './green-house-acces-control.component.html',
  styleUrls: ['./green-house-acces-control.component.css']
})

export class GreenHouseAccesControlComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  greenhouses: any = [];
  greenhousesForUser: any[];
  filteredGreenhouses: any[];
  users: any[];
  usersForGreenhouse: any[];
  filteredUsers: any[];

  public userPlaceholder = 'select a user';
  public greenhousePlaceholder = 'select a greenhouse';
  public selectedUser: any;
  public selectedUserId: any;
  public selectedGreenhouse: any;
  public selectedGreenhouseId: any;

  constructor(
    private greenhouseAccessService: GreenhouseAccesService,
    private greenhouseService: GreenhouseService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      lengthChange: false
      // lengthMenu: [[10, 25, 50, 100, -1], [ 10, 25, 50, 100, 'All']]
    };

    this.greenhouseService.getGreenhouses().subscribe(res => {
      this.greenhouses = res.greenhouses;
      this.filteredGreenhouses = this.greenhouses;
    });

    this.userService.getUsers().subscribe(res => {
      this.users = res.users;
      this.filteredUsers = this.users;
    });
  }

  public selectUser(user) {
    this.selectedUser = user;
    this.greenhouseService.getAll(user._id).subscribe(res => {
      this.greenhousesForUser = (res as any).greenhouses;

      // filter the greenhouses list to only contain greenhouses that the user does not already have access to
      this.filteredGreenhouses = this.filterList(
        this.greenhouses,
        this.greenhousesForUser
      );

      $('#userstable')
        .DataTable()
        .destroy();
      $('#greenhousestable')
        .DataTable()
        .destroy();
      this.dtTrigger.next();
    });
  }

  public selectGreenhouse(greenhouse) {
    this.selectedGreenhouse = greenhouse;
    this.greenhouseService.getAllAccess(greenhouse._id).subscribe(res => {
      this.usersForGreenhouse = (res as any).users;

      // filter the users list to only contain users that do not already have acces to the greenhouse
      this.filteredUsers = this.filterList(this.users, this.usersForGreenhouse);

      $('#userstable')
        .DataTable()
        .destroy();
      $('#greenhousestable')
        .DataTable()
        .destroy();
      this.dtTrigger.next();
    });
  }

  public addGreenHouseAccess(): void {
    this.greenhouseAccessService.register(
      this.selectedUser._id,
      this.selectedGreenhouse._id
    ).subscribe(res => {
      swal('Success!', 'Successfully registered new access!', 'success');
    }, error => {
      swal('Register failed', 'The register attempt has failed', 'error');
    });
  }

  /**
   * funtion that filters a list with all elements from a second list
   * @param fullList list to filter
   * @param secondList list that contains the elements to filter out
   */
  filterList(fullList: any[], secondList: any[]): any[] {
    let found;
    return fullList.filter(firstElement => {
      found = false;
      secondList.forEach(secondElement => {
        if (firstElement._id === secondElement._id) {
          found = true;
        }
      });
      return !found;
    });
  }

  clearUserDropdown() {
    this.selectedUser = null;
    this.greenhousesForUser = [];
    this.filteredGreenhouses = this.greenhouses;
    $('#userstable')
    .DataTable()
    .destroy();
    $('#greenhousestable')
      .DataTable()
      .destroy();
    this.dtTrigger.next();
  }

  clearGreenhouseDropdown() {
    this.selectedGreenhouse = null;
    this.usersForGreenhouse = [];
    this.filteredUsers = this.users;
    $('#userstable')
      .DataTable()
      .destroy();
    $('#greenhousestable')
      .DataTable()
      .destroy();
    this.dtTrigger.next();
  }

  onOptionsSelected(event: any) {
    this.selectGreenhouse(this.greenhouses.find( greenhouse => greenhouse._id === event ));
  }

  onUserSelected(event: any) {
    this.selectUser(this.users.find( user => user._id === event ));
  }

  refresh(): void {
    this.greenhouseService.getGreenhouses().subscribe(res => {
      this.greenhouses = res.greenhouses;
      this.filteredGreenhouses = this.greenhouses;
    });

    this.userService.getUsers().subscribe(res => {
      this.users = res.users;
      this.filteredUsers = this.users.filter(x => !x.isAdmin);
    });
    $('#userstable')
      .DataTable()
      .destroy();
    $('#greenhousestable')
      .DataTable()
      .destroy();
    this.dtTrigger.next();
  }
}
