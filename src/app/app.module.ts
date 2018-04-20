import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/loginscreen/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing-module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    DashboardModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
