import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
// import { AuthInterceptor } from './auth-intercepter.services';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent, HomeComponent, DashboardComponent, LoginComponent
  ],
  providers: [ WeatherService , AuthGuard , LoginService,
  // {
  //   provide: AuthInterceptor,
  //   useClass: TokenInterceptor,
  //   multi: true
  // }
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
