import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './loginscreen/login.component';
import { LoginRoutingModule } from './login.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginRoutingModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [ LoginService ]
})
export class LoginModule { }
