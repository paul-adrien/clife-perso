import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlerteComponent } from './alerte/alerte.component';
import { MeteoComponent } from './meteo/meteo.component';
import { PopulationComponent } from './population/population.component';
import { SimulationComponent } from './simulation/simulation.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TweetComponent } from './tweet/tweet.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-gaurd.service';
import { authInterceptorProviders } from './_helpers/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlerteComponent,
    MeteoComponent,
    PopulationComponent,
    SimulationComponent,
    TemperatureComponent,
    TweetComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuardService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
