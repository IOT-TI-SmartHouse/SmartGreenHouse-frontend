import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.services';
import { DashboardComponent } from './dashboard/dashboardscreen/dashboard.component';
import { GraphsComponent} from './dashboard/graphs/graphs.component';
import { LoginComponent } from './login/loginscreen/login.component';
import { AdminComponent } from './adminControl/admin.component';
import { UserControlComponent } from './adminControl/user-control/user-control.component';
import { GreenHouseControlComponent} from './adminControl/green-house-control/green-house-control.component';
import { GreenHouseAccesControlComponent} from './adminControl/green-house-acces-control/green-house-acces-control.component';
import { InfoComponent } from './info/info.component';
import { ControlComponent} from './control/control.component';
import { AdminGuard } from './admin-guard.service';
import {GreenHouseDepartmentControlComponent} from './adminControl/green-house-department-control/green-house-department-control.component';
import {SensorNodeComponent} from './dashboard/sensor-node-control/sensor-node-control.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'info',
        component: InfoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard/graphs',
        component: GraphsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard/sensornode',
        component: SensorNodeComponent,
        canActivate: [AuthGuard]
    },
    {
      path: 'admin',
      canActivateChild: [AdminGuard],
      data: { roles : ['ADMIN'] },
      children:
        [{
          path: 'userControl',
          canActivate: [AuthGuard],
          component: UserControlComponent
        },
        {
          path: 'greenHouseControl',
          canActivate: [AuthGuard],
          component: GreenHouseControlComponent
        },
        {
          path: 'greenHouseAccessControl',
          canActivate: [AuthGuard],
          component: GreenHouseAccesControlComponent
        },
        {
          path: 'greenHouseDepartmentControl',
          canActivate: [AuthGuard],
          component: GreenHouseDepartmentControlComponent
        }
    ]
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

