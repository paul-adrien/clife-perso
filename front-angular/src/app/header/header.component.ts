import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
  <header role="banner" class="navbar navbar-dark bg-dark navbar-expand-md">
    <nav role="navigation" class="container-fluid">
      <a class="navbar-brand" routerlink="/home">
        <img src="../../assets/img/orange_logo.svg" alt="Back to homepage" title="Back to homepage" width="50" height="50">
        <h1>Clifeguard</h1>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #alerteRouterLink="routerLinkActive"
            [attr.aria-current]="alerteRouterLink.isActive ? 'page': undefined" routerLink="/alerte">Alerte</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #meteoRouterLink="routerLinkActive"
            [attr.aria-current]="meteoRouterLink.isActive ? 'page': undefined" routerLink="/meteo">Météo</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #populationRouterLink="routerLinkActive"
            [attr.aria-current]="populationRouterLink.isActive ? 'page': undefined" routerLink="/population">Population</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #simulationRouterLink="routerLinkActive"
            [attr.aria-current]="simulationRouterLink.isActive ? 'page': undefined" routerLink="/simulation">Simulation</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #temperatureRouterLink="routerLinkActive"
            [attr.aria-current]="temperatureRouterLink.isActive ? 'page': undefined" routerLink="/temperature">Température</a>
          </li><!--
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #tweetRouterLink="routerLinkActive"
            [attr.aria-current]="tweetRouterLink.isActive ? 'page': undefined" routerLink="/tweet">Tweet</a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" (click)="logout()">Logout</a>
          </li>
          <!--<li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #navbarRouterLink="routerLinkActive"
            [attr.aria-current]="navbarRouterLink.isActive ? 'page': undefined" routerLink="/documentation/navbar">Lancer alerte</a>
          </li>-->
        </ul>
        <ul class="navbar-nav flex-row ml-md-auto d-md-flex align-items-center">
          <li class="nav-item">
            <a class="nav-link py-2" href="#">
              <svg class="navbar-nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" focusable="false"><title>Home</title><path d="M502.272 128.512c-0.512 0.205-4.506 1.126-8.704 2.048-14.643 3.379-25.395 9.728-37.99 22.323-9.318 9.216-104.243 105.677-117.555 119.398-5.325 5.427-30.618 31.13-56.32 57.242s-52.941 53.862-60.518 61.645c-15.667 15.974-95.642 97.28-108.954 110.797-4.813 4.813-8.806 9.114-8.806 9.421s34.304 0.614 76.288 0.614h76.288v157.184c0 139.674 0.205 158.106 1.638 165.171 5.837 28.467 26.317 50.381 55.398 59.29 5.632 1.638 17.203 1.843 195.379 2.048 171.52 0.307 190.157 0.205 197.632-1.331 31.744-6.451 55.706-31.232 60.928-62.976 0.614-4.301 1.024-60.416 1.024-163.021v-156.365h153.702l-7.475-7.578c-11.162-11.264-94.72-96.256-109.261-111.104-6.963-7.066-33.69-34.304-59.494-60.518s-53.043-53.862-60.518-61.645c-22.835-23.245-99.942-101.683-112.23-114.074-17.203-17.203-28.16-23.859-45.875-27.546-6.656-1.331-21.606-1.946-24.576-1.024zM571.392 515.686c8.397 3.994 14.746 10.342 18.842 18.842l3.174 6.656 0.307 116.019 0.205 115.917-231.936-0.512-6.656-3.174c-8.499-3.994-14.848-10.342-18.842-18.842l-3.174-6.656-0.307-116.019-0.205-115.917 231.936 0.512 6.656 3.174z" fill="currentColor" fill-rule="evenodd"></path></svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(public route: Router) { }

  ngOnInit() {

  }

  logout() {
    localStorage.clear();
    this.route.navigate(["/login"]);
  }

  public active = false;
  public languages = [
    { name: 'EN', label: 'English version', lang: 'en', current: this.active },
    { name: 'FR', label: 'Version française', lang: 'fr', current: this.active },
    { name: 'SP', label: 'Versión en español', lang: 'sp', current: this.active }
  ];
  public selectLanguage = { name: 'Languages', label: '', lang: '' };

  ChangeLanuage(l) {
    this.selectLanguage = l;
    this.languages.forEach(lang => { lang.current = this.active; });
    l.current = !l.current;
  }
}
