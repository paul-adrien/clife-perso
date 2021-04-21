import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TweetComponent } from './tweet/tweet.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { SimulationComponent } from './simulation/simulation.component';
import { PopulationComponent } from './population/population.component';
import { MeteoComponent } from './meteo/meteo.component';
import { AlerteComponent } from './alerte/alerte.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-gaurd.service';


const routes: Routes = [
  { path: 'home', component: MenuComponent ,
  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent ,
  canActivate: [AuthGuard]},
  { path: 'admin', component: BoardAdminComponent ,
  canActivate: [AuthGuard]},
  { path: 'alerte', component:  AlerteComponent,
  canActivate: [AuthGuard]},
  { path: 'meteo', component:  MeteoComponent,
  canActivate: [AuthGuard]},
  { path: 'population', component:  PopulationComponent,
  canActivate: [AuthGuard]},
  { path: 'simulation', component:  SimulationComponent,
  canActivate: [AuthGuard]},
  { path: 'temperature', component:  TemperatureComponent ,
  canActivate: [AuthGuard]},
  { path: 'tweet', component:  TweetComponent ,
  canActivate: [AuthGuard]},
  { path: '**', component:  MenuComponent ,
  canActivate: [AuthGuard]},
  { path: '', component:  MenuComponent ,
  canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
