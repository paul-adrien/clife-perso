import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  template: `
  <main class="container my-5" role="main" style="margin-bottom: 150px">
    <div class="row">
      <div class="col-md-4 col-lg-4" style="margin-bottom: 150px">
        <div class="card">
          <img src="../../assets/img/2020_Illustration_Guideline_High_Five_White_RGB.png" class="card-img-top" style='height: 400px;'>
          <div class="card-body">
            <h5 class="card-title">S'entraider</h5>
            <p class="card-text">Application d'alerte</p>
            <a routerLink="/S_entraider" class="btn btn-primary">Voir</a>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4" style="margin-bottom: 150px">
          <div class="card">
            <img src="../../assets/img/temp.png" class="card-img-top" style='height: 400px;'>
            <div class="card-body">
              <h5 class="card-title">Visualiser</h5>
              <p class="card-text"></p>
              <a routerLink="/visualiser" class="btn btn-primary">Voir</a>
            </div>
          </div>
      </div>
      <div class="col-md-4 col-lg-4" style="margin-bottom: 150px">
        <div class="card">
          <img src="../../assets/img/17 ORANGE ILLUSTRATIONS VR TECH W RVB.png" class="card-img-top" style='height: 400px;'>
          <div class="card-body">
            <h5 class="card-title">Se projeter</h5>
            <p class="card-text">Carte intéractive de l'évolution climatique en frances et de son impact sur les répartiteurs Orange</p>
            <a routerLink="/Se_projeter" class="btn btn-primary">Voir</a>
          </div>
        </div>
      </div>
    </div>
  </main>
`,
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
}
