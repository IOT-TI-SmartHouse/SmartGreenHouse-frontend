import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.services';
import { DashboardComponent } from './dashboard/dashboardscreen/dashboard.component';
import { LoginComponent } from './login/loginscreen/login.component';
import { AdminComponent } from './adminControl/admin.component';
import { UserControlComponent } from './adminControl/user-control/user-control.component';
import { GreenHouseControlComponent} from './adminControl/green-house-control/green-house-control.component';
import { GreenHouseAccesControlComponent} from './adminControl/green-house-acces-control/green-house-acces-control.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'info',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
      path: 'userControl',
      component: UserControlComponent
    },
    {
      path: 'greenHouseControl',
      component: GreenHouseControlComponent
    },
    {
      path: 'greenHouseAccessControl',
      component: GreenHouseAccesControlComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

