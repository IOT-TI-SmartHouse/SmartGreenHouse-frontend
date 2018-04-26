import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/loginscreen/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing-module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';
import { WeatherService } from './dashboard/services/weather.services';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth-guard.services';
//import { AuthInterceptor } from './auth-intercepter.services';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    DashboardModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent, HomeComponent,
  ],
  providers: [ WeatherService , AuthGuard ,
  // {
  //   provide: AuthInterceptor,
  //   useClass: TokenInterceptor,
  //   multi: true
  // }
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
