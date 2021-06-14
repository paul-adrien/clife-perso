import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
  <header role="banner" class="navbar navbar-expand-sm navbar-dark">
    <nav role="navigation" class="container-fluid">
      <a class="navbar-brand" routerlink="/home">
        <img src="../../assets/img/orange_logo.svg" alt="Back to homepage" title="Back to homepage" width="50" height="50">
        <h2>Hello Climate</h2>
      </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
      <div class="navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #alerteRouterLink="routerLinkActive"
            [attr.aria-current]="alerteRouterLink.isActive ? 'page': undefined" routerLink="/S_entraider">S'entraider</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #meteoRouterLink="routerLinkActive"
            [attr.aria-current]="meteoRouterLink.isActive ? 'page': undefined" routerLink="/visualiser">Visualiser</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" #temperatureRouterLink="routerLinkActive"
            [attr.aria-current]="temperatureRouterLink.isActive ? 'page': undefined" routerLink="/Se_projeter">Se projeter</a>
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
