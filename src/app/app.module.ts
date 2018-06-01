import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/loginscreen/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth-guard.services';
import { DashboardComponent } from './dashboard/dashboardscreen/dashboard.component';
import { LoginService } from './login/services/login.service';
import { MenuBarComponent } from './menu/menubar/menubar.component';
import { AdminComponent } from './adminControl/admin.component';
import { UserControlComponent } from './adminControl/user-control/user-control.component';
import { GreenHouseControlComponent } from './adminControl/green-house-control/green-house-control.component';
import { GreenHouseAccesControlComponent } from './adminControl/green-house-acces-control/green-house-acces-control.component';
import { GreenhouseService} from './login/services/greenhouse.service';
import { GreenhouseAccesService } from './login/services/greenhouseAcces.service';
import { UserService} from './login/services/user.service';
import { InfoComponent } from './info/info.component';
import { GreenHouseDepartmentControlComponent } from './adminControl/green-house-department-control/green-house-department-control.component';
import { ControlComponent } from './control/control.component';
import { GreenhouseDepartmentService} from './login/services/greenhouse-department.service';
import {GraphsComponent} from './dashboard/graphs/graphs.component';
import { SensorNodeComponent } from './control/sensor-node-control/sensor-node-control.component';
import {SensorNodeService} from './login/services/sensor-node.service';
import { AdminGuard } from './admin-guard.service';
// import { AuthInterceptor } from './auth-intercepter.services';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent, HomeComponent, DashboardComponent, LoginComponent, AdminComponent, InfoComponent,
    UserControlComponent, GreenHouseControlComponent, GreenHouseAccesControlComponent, MenuBarComponent,
    GreenHouseDepartmentControlComponent, ControlComponent , GraphsComponent, SensorNodeComponent
  ],
  providers: [ AuthGuard , AdminGuard,  LoginService, GreenhouseService, GreenhouseAccesService, UserService, GreenhouseDepartmentService, SensorNodeService
  // {
  //   provide: AuthInterceptor,
  //   useClass: TokenInterceptor,
  //   multi: true
  // }
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
