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
import { MenuVisuComponent } from './menu-visu/menu-visu.component';


const routes: Routes = [
  { path: 'home', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'S_entraider', component: AlerteComponent },
  { path: 'meteo', component: MeteoComponent },
  { path: 'visualiser', component: MenuVisuComponent },
  { path: 'population', component: PopulationComponent },
  { path: 'inondations', component: SimulationComponent },
  { path: 'Se_projeter', component: TemperatureComponent },
  { path: 'tweet', component: TweetComponent },
  { path: '**', component: MenuComponent },
  { path: '', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
