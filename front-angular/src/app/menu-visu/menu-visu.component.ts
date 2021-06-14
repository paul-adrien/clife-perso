import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-visu',
  template: `
  <main class="container my-5" role="main" style="margin-bottom: 150px">
    <div class="row">
      <div class="col-md-3 col-lg-3" style="margin-bottom: 150px">
          <div class="card">
            <img src="../../assets/img/Ryan_Todd_Cloud_White_RGB.png" class="card-img-top" style='max-height: 300px;'>
            <div class="card-body">
              <h5 class="card-title">Météo</h5>
              <p class="card-text"></p>
              <a routerLink="/meteo" class="btn btn-primary">Voir</a>
            </div>
          </div>
      </div>
      <div class="col-md-3 col-lg-3" style="margin-bottom: 150px">
          <div class="card">
            <img src="../../assets/img/09 ORANGE ILLUSTRATIONS LA VILLE 2 W RVB.png" class="card-img-top" style='max-height: 300px;'>
            <div class="card-body">
              <h5 class="card-title">Population</h5>
              <p class="card-text"></p>
              <a routerLink="/population" class="btn btn-primary">Voir</a>
            </div>
          </div>
      </div>
      <div class="col-md-3 col-lg-3" style="margin-bottom: 150px">
          <div class="card">
            <img src="../../assets/img/temp.png" class="card-img-top" style='max-height: 300px;'>
            <div class="card-body">
              <h5 class="card-title">Inondations</h5>
              <p class="card-text"></p>
              <a routerLink="/inondations" class="btn btn-primary">Voir</a>
            </div>
          </div>
      </div>
      <div class="col-md-3 col-lg-3" style="margin-bottom: 150px">
          <div class="card">
            <img src="../../assets/img/temp.png" class="card-img-top" style='max-height: 300px;'>
            <div class="card-body">
              <h5 class="card-title">Tweet</h5>
              <p class="card-text"></p>
              <a routerLink="/tweet" class="btn btn-primary">Voir</a>
            </div>
          </div>
      </div>
    </div>
  </main>
`,
  styleUrls: ['./menu-visu.component.scss']
})
export class MenuVisuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
