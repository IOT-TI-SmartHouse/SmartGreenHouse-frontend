import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/loginscreen/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './home/home.component';
import { WeatherService } from './dashboard/services/weather.services';
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
import {User} from './dataObjects/classes/user.class';
import { GreenHouseDepartmentControlComponent } from './adminControl/green-house-department-control/green-house-department-control.component';
import{ GreenhouseDepartmentService} from './login/services/greenhouse-department.service';

// import { AuthInterceptor } from './auth-intercepter.services';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent, HomeComponent, DashboardComponent, LoginComponent, AdminComponent,
    UserControlComponent, GreenHouseControlComponent, GreenHouseAccesControlComponent, MenuBarComponent, GreenHouseDepartmentControlComponent
  ],
  providers: [ WeatherService , AuthGuard , LoginService, GreenhouseService, GreenhouseAccesService, UserService, GreenhouseDepartmentService
  // {
  //   provide: AuthInterceptor,
  //   useClass: TokenInterceptor,
  //   multi: true
  // }
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
