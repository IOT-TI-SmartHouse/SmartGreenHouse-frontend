import { Component, OnInit, ViewChild } from '@angular/core';
import { GreenhouseAccesService} from '../../login/services/greenhouseAcces.service';
import { Subject} from 'rxjs/Subject';
import { GreenhouseService} from '../../login/services/greenhouse.service';
import { UserService} from '../../login/services/user.service';


@Component({
  selector: 'app-green-house-acces-control',
  templateUrl: './green-house-acces-control.component.html',
  styleUrls: ['./green-house-acces-control.component.css']
})
export class GreenHouseAccesControlComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  users: any[];
  greenhouses: any = [];
  greenhousesForUser: any[];
  usersForGreenhouse: any[];


  public userPlaceholder = 'select a user';
  public greenhousePlaceholder = 'select a greenhouse';
  public selectedUser: any;
  public selectedGreenhouse: any;


  constructor(private greenhouseAccessService: GreenhouseAccesService, private greenhouseService: GreenhouseService, private userService: UserService) { }

  ngOnInit() {
    window.alert = function () { };
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      lengthChange: false
      // lengthMenu: [[10, 25, 50, 100, -1], [ 10, 25, 50, 100, 'All']]
    };

    this.greenhouseService.getGreenhouses().subscribe( res => {
      this.greenhouses = res.greenhouses;
    });

    this.userService.getUsers().subscribe( res => {
      this.users = res.users;
    });
  }

  public selectUser(user) {
    this.selectedUser = user;
    this.greenhouseService.getAll(user._id).subscribe( res => {
      console.log(res);
      this.greenhousesForUser = (res as any).greenhouses;
      $('#userstable').DataTable().destroy();
      $('#greenhousestable').DataTable().destroy();
      this.dtTrigger.next();
    });
  }

  public selectGreenhouse(greenhouse) {
    this.selectedGreenhouse = greenhouse;
    this.greenhouseService.getAllAccess(greenhouse._id).subscribe( res => {
      console.log(res);
      this.usersForGreenhouse = (res as any).users;
      $('#userstable').DataTable().destroy();
      $('#greenhousestable').DataTable().destroy();
      this.dtTrigger.next();
    });
  }

  public addGreenHouseAccess(): void {
    this.greenhouseAccessService.register(this.selectedUser._id, this.selectedGreenhouse._id);
  }

}
