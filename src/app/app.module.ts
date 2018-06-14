import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth-guard.services';
import { AgmCoreModule} from '@agm/core';
import { DashboardComponent } from './dashboard/dashboardscreen/dashboard.component';
import { MenuBarComponent } from './menubar/menubar.component';
import { AdminComponent } from './adminControl/admin.component';
import { UserControlComponent } from './adminControl/user-control/user-control.component';
import { GreenHouseControlComponent } from './adminControl/green-house-control/green-house-control.component';
import { GreenHouseAccesControlComponent } from './adminControl/green-house-acces-control/green-house-acces-control.component';
import { InfoComponent } from './info/info.component';
import { GraphsComponent } from './dashboard/graphs/graphs.component';
import { SensorNodeComponent } from './dashboard/sensor-node-control/sensor-node-control.component';
import { SensorNodeService } from './services/sensor-node.service';
import { AdminGuard } from './services/admin-guard.service';
import { GreenHouseDepartmentControlComponent } from './adminControl/green-house-department-control/green-house-department-control.component';
import { LoginService } from './services/login.service';
import { GreenhouseService } from './services/greenhouse.service';
import { GreenhouseAccessService } from './services/greenhouse-access.service';
import { UserService } from './services/user.service';
import { GreenhouseDepartmentService } from './services/greenhouse-department.service';
import { MapComponent } from './dashboard/map/map.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MyDateRangePickerModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyA51cn3Kj9Vf59T-S5-JHVtU78NHxrRRm4'})
  ],
  declarations: [
    AppComponent, DashboardComponent, LoginComponent, AdminComponent, InfoComponent,
    UserControlComponent, GreenHouseControlComponent, GreenHouseAccesControlComponent, MenuBarComponent,
    GreenHouseDepartmentControlComponent, GraphsComponent, SensorNodeComponent, MapComponent
  ],
  providers: [ AuthGuard , AdminGuard,  LoginService, GreenhouseService,
     GreenhouseAccessService, UserService, GreenhouseDepartmentService, SensorNodeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
