import {Component, OnInit} from '@angular/core';
import { Subject} from 'rxjs/Subject';
import { GreenhouseAccesService } from '../../services/greenhouseAcces.service';
import { GreenhouseService } from '../../services/greenhouse.service';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
declare var $: any;

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
  filteredUsers: any[];

  public userPlaceholder = 'Select a user';
  public greenhousePlaceholder = 'Select a greenhouse';
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
    };

    this.greenhouseService.getGreenhouses().subscribe(res => {
      this.greenhouses = res.greenhouses;
      this.filteredGreenhouses = this.greenhouses.sort();
    });

    this.userService.getUsers().subscribe(res => {
      //this.users = res.users;
      this.filteredUsers = (res as any).users.filter(x => !x.isAdmin).sort();
    });
  }

  public selectUser(user) {
    this.selectedUser = user;
    this.selectedGreenhouse = null;
    $('#greenhouseSelect').val([]);
    this.greenhouseService.getAll(user._id).subscribe(res => {
      this.greenhousesForUser = (res as any).greenhouses.filter(x => x != null);

      // filter the greenhouses list to only contain greenhouses that the user does not already have access to
      this.filteredGreenhouses = this.filterList(
        this.greenhouses,
        this.greenhousesForUser
      );
      $('#greenhousestable').DataTable().clear().destroy();
      this.dtTrigger.next();
      //$('#greenhousestable').DataTable().draw();
    });
  }

  public selectGreenhouse(greenhouse) {
    this.selectedGreenhouse = greenhouse;
  }

  public addGreenHouseAccess(): void {
    this.greenhouseAccessService.register(
      this.selectedUser._id,
      this.selectedGreenhouse._id
    ).subscribe(res => {
      swal('Success!', 'Successfully registered new access!', 'success');
      this.refresh();
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
    }).sort();
  }

  onOptionsSelected(event: any) {
    this.selectGreenhouse(this.greenhouses.find( greenhouse => greenhouse._id === event ));
  }

  onUserSelected(event: any) {
    this.selectUser(this.filteredUsers.find(user => user._id === event));
  }

  refresh(): void {
    this.selectedGreenhouse = null;
    $('#greenhouseSelect').val([]);

    this.greenhouseService.getAll(this.selectedUser._id).subscribe(res => {
      this.greenhousesForUser = (res as any).greenhouses.filter(x => x != null);

      // filter the greenhouses list to only contain greenhouses that the user does not already have access to
      this.filteredGreenhouses = this.filterList(
        this.greenhouses,
        this.greenhousesForUser
      );
    });

    //$('#greenhousestable').DataTable().draw('full-reset');
    //$('#greenhousestable').DataTable().clear().destroy();
    //this.dtTrigger.next();
  }

  removeAccess(greenhouse: any) {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7CBB00',
      cancelButtonColor: '#e52013',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.greenhouseAccessService.delete(this.selectedUser._id, greenhouse._id).subscribe(res => {
          swal('Success!', 'Successfully removed access!', 'success');
          this.refresh();
        }, error => {
          swal('Delete failed', 'The delete attempt has failed', 'error');
        });
      }
    });
  }
}
