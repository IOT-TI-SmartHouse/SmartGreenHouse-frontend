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
import { AdminGuard } from './admin-guard.service';


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
      path: 'admin',
      canActivateChild: [AdminGuard],
      data: { roles : ['ADMIN'] },
      children:
        [{
            path: 'controlpanel',
            canActivate: [AuthGuard],
            component: AdminComponent
        },
        {
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

